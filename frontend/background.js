// Register right-click menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "simplify-text",
    title: "Simplify with SimplifyIt",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "simplify-text" && info.selectionText) {
    try {
      // Inject content script FIRST
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content-script.js"]
      });

      // Call your backend API
      const response = await fetch("http://localhost:8000/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: info.selectionText })
      });
      const data = await response.json();

      // Send message AFTER content script is injected
      chrome.tabs.sendMessage(tab.id, {
        action: "show-simplified-text",
        text: data.simplified_text
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
});