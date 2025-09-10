document.getElementById("scanBtn").addEventListener("click", async () => {
  console.log("Scan button clicked");
  let tabs = await browser.tabs.query({ active: true, currentWindow: true });
  console.log("Sending message to content script");
  browser.tabs.sendMessage(tabs[0].id, { action: "scan" });
});

browser.runtime.onMessage.addListener((message) => {
  console.log("Message received in popup:", message);
  if (message.action === "scanResult") {
    document.getElementById("results").innerText = message.result;
  }
});
