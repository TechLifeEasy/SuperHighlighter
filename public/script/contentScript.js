
const init = document.querySelector("body").innerHTML;


function highlight(text) {
  console.log('call the fun')
  var inputText = document.querySelector("body");
  var innerHTML = inputText.innerHTML;
  var index = innerHTML.indexOf(text);
  if (index >= 0) {
    innerHTML = innerHTML.substring(0, index) + "<span class='highlight' style=\'background: yellow; color:black;\'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
    console.log(innerHTML);
    inputText.innerHTML = innerHTML;
  }
}



chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    console.log('do someting')
    if (request.msg == "highlight") {
      const list = request.Note;
      console.log(list)

      document.querySelector('body').innerHTML = init;

      list.forEach(element => {

        highlight(element);

      });
    }
  });





