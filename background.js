let color = "red";
console.log("Hello World");
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
});
