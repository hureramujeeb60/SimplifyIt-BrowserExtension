// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "show-simplified-text") {
    // Remove old popups
    const oldPopup = document.getElementById("simplifyit-popup");
    if (oldPopup) oldPopup.remove();

    // Create popup
    const popup = document.createElement("div");
    popup.id = "simplifyit-popup";
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.backgroundColor = "#f9f9f9";
    popup.style.padding = "15px";
    popup.style.border = "1px solid #ccc";
    popup.style.borderRadius = "8px";
    popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    popup.style.zIndex = "1000";
    popup.style.maxWidth = "300px";
    popup.style.fontFamily = "Arial, sans-serif";
    popup.innerHTML = `
      <p style="margin: 0 0 10px; color: #333;">${request.text}</p>
      <button id="simplifyit-speak" style="background-color: #007bff; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">🔊 Play</button>
    `;

    // Add text-to-speech
    popup.querySelector("#simplifyit-speak").addEventListener("click", () => {
      const utterance = new SpeechSynthesisUtterance(request.text);
      window.speechSynthesis.speak(utterance);
    });

    document.body.appendChild(popup);
  }
});