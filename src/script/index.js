console.log('call')

chrome.runtime.onMessage.addListener(
    function(message, messageSender, sendResponse) {
    console.log(message,messageSender);
    }
);