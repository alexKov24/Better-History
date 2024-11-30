# Better History Browser Extension 🕒



> ⚠️ **Project Status**: Development has been discontinued as better alternatives exist in the browser extension ecosystem. The project will remain archived until we identify significant improvements that would add unique value beyond existing solutions.

## 📋 Overview

A browser extension that enhances the default browser history with improved search, tracking, and visualization capabilities.



## ✨ Features

- 📊 Real-time history tracking
- 🔍 Quick search across your entire history
- 🎯 Toggle tracking on/off with one click
- 🗑️ Easy history clearing
- 🖼️ Favicon support for visual reference
- ⚡ Efficient IndexedDB storage
- 📱 Clean, modern UI

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/alexKov24/Better-History.git
```

2. Open your browser's extension page
   - Chrome: `chrome://extensions`
   - Firefox: `about:debugging#/runtime/this-firefox`

3. Enable Developer Mode

4. Click "Load unpacked" and select the project directory

## 🛠️ Technical Details

### Structure
```
better-history/
├── manifest.json      # Extension configuration
├── popup.html        # UI layout
├── popup.js         # UI logic
├── background.js    # Core functionality
├── db.js           # Database operations
└── icon.png        # Extension icon
```

### Permissions
- `webNavigation`
- `storage`
- `<all_urls>`
- `tabs`

## ⚡ Quick Start

1. Install the extension
2. Click the extension icon in your browser toolbar
3. Toggle tracking on/off using the switch
4. Use the search bar to find specific entries
5. Clear history with the "Clear History" button

## 🤝 Contributing

While active development has ceased, you're welcome to:
- Fork the repository
- Create feature branches
- Open issues for discussion

## 🔄 Alternatives

We recommend exploring these alternatives:
- Your browser's built-in history manager
- Popular history management extensions from your browser's store

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ by alexKov24
</div>
