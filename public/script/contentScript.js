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

highlight(`In the Back End Development and APIs Certification, you'll learn how to write back end apps with Node.js and npm (Node Package Manager). You'll also build web applications with the Express framework, and build a People Finder microservice with MongoDB and the Mongoose library.`)