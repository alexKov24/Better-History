// popup.js
document.addEventListener('DOMContentLoaded', async () => {
  console.log("Popup opened");
  
  // Default icon as data URI - simple globe icon
  const DEFAULT_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bS0xIDE3LjkzYy0zLjk1LS40OS03LTMuODUtNy03LjkzIDAtLjYyLjA4LTEuMjEuMjEtMS43OUw5IDEwdjFjMCAxLjEuOSAyIDIgMnYxbC0yIDJ2MWwxLjkzLjkzem02LjktMi41NGMtLjI2LS44MS0xLTEuMzktMS45LTEuMzloLTF2LTNjMC0uNTUtLjQ1LTEtMS0xaC02di0yaDJjLjU1IDAgMS0uNDUgMS0xVjdoMmMxLjEgMCAyLS45IDItMnYtLjQxYzIuOTMgMS4xOSA1IDQuMDYgNSA3LjQxIDAgMi4wOC0uOCAzLjk3LTIuMSA1LjM5eiIvPjwvc3ZnPg==';
  
  // Load tracking state
  const { isTracking } = await browser.storage.local.get('isTracking');
  document.getElementById('trackingToggle').checked = isTracking !== false;

  // Toggle tracking
  document.getElementById('trackingToggle').addEventListener('change', (e) => {
    browser.runtime.sendMessage({
      type: 'toggleTracking',
      enabled: e.target.checked
    });
  });

  // Clear history
  document.getElementById('clearHistory').addEventListener('click', async () => {
    if (confirm('Are you sure you want to clear all history?')) {
      await browser.runtime.sendMessage({ type: 'clearHistory' });
      loadHistory();
    }
  });

  document.getElementById('searchTerm').addEventListener('input',  (e) => {
    loadSearchResults(e.target.value);
  })

  // Load and display history
  async function loadHistory() {
    try {
      console.log("Requesting history...");
      const response = await browser.runtime.sendMessage({
        type: 'getHistory',
        limit: 50
      });
      
      console.log("Received response:", response);

      if (!response.success || !response.history) {
        console.error("Invalid response:", response);
        return;
      }

      const historyList = document.getElementById('historyList');
      setHistoryList(historyList, response.history);

    } catch (error) {
      console.error("Error loading history:", error);
    }
  }

  async function loadSearchResults(searchTerm) {
    try {
      console.log(`Requesting Search Results for ${searchTerm}...`);

      const response = await browser.runtime.sendMessage({
        type: 'getSearchResults',
        searchTerm: searchTerm,
        limit: 10
      });

      console.log("Received response:", response);

      if (!response.success || !response.result) {
        console.error("Invalid response:", response);
        return;
      }


      const historyList = document.getElementById('historyList');
      setHistoryList(historyList, response.result);

    } catch (error) {
      console.error(`Error loading search results for ${searchTerm}:`, error);
    }
  }

  function setHistoryList(historyListElement, historyList) {
    historyListElement.innerHTML = ''; // Clear existing items

    historyList.forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item';

      const favicon = document.createElement('img');
      favicon.className = 'favicon';

      // Only try to load the favicon if we have a URL for it
      if (item.favicon) {
        favicon.src = item.favicon;
        favicon.onerror = () => {
          favicon.src = DEFAULT_ICON;
          favicon.onerror = null; // Prevent infinite loop if DEFAULT_ICON fails
        };
      } else {
        favicon.src = DEFAULT_ICON;
      }

      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = item.title || new URL(item.url).hostname;
      title.title = item.url;

      const timestamp = document.createElement('div');
      timestamp.className = 'timestamp';
      timestamp.textContent = new Date(item.timestamp).toLocaleString();

      div.appendChild(favicon);
      div.appendChild(title);
      div.appendChild(timestamp);
      historyListElement.appendChild(div);
    });
  }

  // Initial load
  loadHistory();
});