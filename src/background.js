chrome.runtime.onInstalled.addListener(() => {
  console.log("Airbnb Stay Sync Extension Installed");
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab?.id ?? 0 },
    files: ["content.js"],
  });
});
