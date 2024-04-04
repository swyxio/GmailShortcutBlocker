
// This background script will be used for handling background tasks for the extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('Gmail Shortcut Blocker extension installed.');
});

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(id, info, tab){
  // If the tab's URL contains 'mail.google.com', inject the content script
  if (tab.url.toLowerCase().includes("mail.google.com")){
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['src/content.js']
    });
  }
});
