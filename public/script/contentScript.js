console.log('call me')

window.chrome.runtime.onMessage.addListener(
    function(message, messageSender, sendResponse) {
    console.log(message,messageSender);
    highlight(message.data)
    }
);

// chrome.runtime.sendMessage({ zeel:"zeel is best"});



function highlight(text) {
    console.log('call the fun')
    var inputText = document.querySelector("body");
    var innerHTML = inputText.innerHTML;
    var index = innerHTML.indexOf(text);
    if (index >= 0) {
      innerHTML = innerHTML.substring(0, index) + "<span class='highlight' style=\'background: yellow;\'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
      console.log(innerHTML);
      inputText.innerHTML = innerHTML;
}
}

// highlight('Until this point, you\'ve only used JavaScript on the front end to add interactivity to a page, solve algorithm challenges, or build an SPA. But JavaScript can also be used on the back end, or server, to build entire web applications.')