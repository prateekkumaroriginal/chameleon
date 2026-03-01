// Chameleon background service worker
// Minimal — content script is registered via manifest for <all_urls>
// This worker just ensures the extension lifecycle stays active

chrome.runtime.onInstalled.addListener(() => {
  console.log("Chameleon extension installed");
});
