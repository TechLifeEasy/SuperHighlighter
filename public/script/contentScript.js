
const init = document.querySelector("body").innerHTML;


function highlight(text) {
  console.log('call the fun')
  var inputText = document.querySelector("body").innerHTML;

  const index=FindIndex(inputText,text);

  if(index==null) return;

  const tag=FindMainTag(index.s,inputText);

  const list=Array.from(document.querySelectorAll(tag));

  const myTagList=list.find((div_data)=>FindIndex(div_data.innerHTML,text)!=null);

  return myTagList;

  // var innerHTML = inputText.innerHTML;
  // var index = innerHTML.indexOf(text);
  // if (index >= 0) {
  //   innerHTML = innerHTML.substring(0, index) + "<span class='highlight' style=\'background: yellow; color:black;\'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
  //   console.log(innerHTML);
  //   inputText.innerHTML = innerHTML;
  // }
}



function FindIndex(Source, Target) {

  let index=null;


  for (let i = 0; i < Source.length; i++) {

    let ans = isPresent(Source, i, Target);

    ans={s:i,e:ans};

    if (ans.e && (index==null || index.e-index.s>ans.e-ans.s)) {
      index=ans;
    }
  }

  return index;
}


function FindMainTag(index,Source){

  let close=0;

  while(index>=0){
    if(Source.charAt(index)=='>' && Source.charAt(index-1)!='/' && close==0){
      let tag='';
      index--;
      while(Source.charAt(index)!='<'){
        tag+=Source.charAt(index);
        index--;
      }
      
      return tag.trim().split(' ')[0];
    }else if(Source.charAt(index)=='>' && Source.charAt(index-1)!='/'){
      close++;
    }else if(Source.charAt(index)=='>'){
      close--;
    }
    index--;
  }

  return null;

}

function isPresent(Source, i, Target){
  let j=0;

  if(Source.charAt(i)!=Target.charAt(j)) return null;

  while(j<Target.length && i<Source.length){
// 'zee'.cha
    if(Source.charAt(i)==Target.charAt(j)){
      i++;
      j++;
    }else{
      i++;
    }
  }

  // /> >

  return j==Target.length ? i :null;
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





