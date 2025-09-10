console.log("content.js loaded");

function scanPage() {
  const suspiciousWords = ["rumor", "alleged", "unverified", "citation needed", "disputed"];
  let found = [];

  suspiciousWords.forEach(word => {
    if (document.body.innerText.toLowerCase().includes(word)) {
      found.push(word);
      
    }
  });

  if (found.length > 0) {
    let result = "Suspicious words found: " + found.join(", ");
    alert(result); // 🔹 Shows a popup alert on the Wikipedia page
    return result;
  } else {
    let result = "No suspicious words detected.";
    alert(result); // 🔹 Shows a popup alert on the Wikipedia page
    return result;
   }
}

browser.runtime.onMessage.addListener((message) => {
  console.log("Message received in content script:", message);
  if (message.action === "scan") {
    let result = scanPage();
    console.log("Sending scan result:", result);
    browser.runtime.sendMessage({ action: "scanResult", result: result });
    
  }
});

