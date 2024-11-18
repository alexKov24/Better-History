// background.js
let isTracking = true;
let db;

// Initialize database
async function init() {
  db = new HistoryDB();
  await db.init();
  
  // Load tracking state
  const result = await browser.storage.local.get('isTracking');
  isTracking = result.isTracking !== undefined ? result.isTracking : true;
}

init().catch(console.error);

// Listen for navigation events
browser.webNavigation.onCompleted.addListener(async (details) => {
  if (!isTracking) return;
  
  try {
    const tab = await browser.tabs.get(details.tabId);
    console.log("Storing history for:", tab.title);
    await db.addEntry({
      url: details.url,
      title: tab.title,
      favicon: tab.favIconUrl, // Store only the actual favicon URL
      tabId: details.tabId,
      frameId: details.frameId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error storing history:', error);
  }
});

// Listen for messages from popup
browser.runtime.onMessage.addListener((message, sender) => {
  console.log("Received message:", message); // Debug log

  return new Promise(async (resolve) => {
    try {
      if (message.type === 'toggleTracking') {
        isTracking = message.enabled;
        await browser.storage.local.set({ isTracking });
        resolve({ success: true });
      }
      else if (message.type === 'getHistory') {
        const history = await db.getHistory(message.limit || 100);
        console.log("Fetched history:", history); // Debug log
        resolve({ success: true, history: history });
      }
      else if (message.type === 'clearHistory') {
        await db.clearHistory();
        resolve({ success: true });
      } else if (message.type === 'getSearchResults') {
        const result = await db.searchHistory(message.searchTerm, message.limit || 10);
        console.log("Fetched search:", result);
        resolve({ success: true, result: result });
      } else {
        resolve({ success: false });
      }
    } catch (error) {
      console.error('Error handling message:', error);
      resolve({ success: false, error: error.message });
    }
  });
});