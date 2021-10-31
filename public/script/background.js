/*Crating the Context Menu*/

window.chrome.contextMenus.create({
    id: "note-op",
    title: 'Add to Note',
    contexts: ["selection"]
});

function noop(){

}






window.chrome.contextMenus.onClicked.addListener(getData)

// chrome.tabs.create({url: "/popup.html"}).then(() => {
//     chrome.tabs.executeScript({
//       code: `console.log('location:', window.location.href);`
//     });
// });


function getData(information) {
    if (information.menuItemId === "note-op") {
        // console.log("Word " + information.selectionText + " was clicked.");
        console.log('send')
        const data = information.selectionText;

        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            const link =GetUrl(tabs[0].url);
            const info = {
                msg: 'Add_Note',
                data: data,
                link: link
            }

            console.log(info)
            chrome.storage.sync.set({data: info}, function() {
                console.log('Value is set to ');
            });

            chrome.notifications.create('1', {
                type: 'basic',
                title: 'Add New Note',
                message: ' New Note Add for This Website 🎅',
                priority: 1,
                iconUrl:'../logo.png'
            },noop)
        });
    }
}



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    
        if(request.msg=="webLink"){   
            chrome.tabs.query({ currentWindow: true, active: true }, 
                function (tabs) {
                const link =GetUrl(tabs[0].url);

                console.log(link)

                chrome.storage.sync.set({link}, function() {});
                
            }
            );
        }else if(request.msg=="highlight"){
            chrome.tabs.query({active: true, currentWindow: true},
                 function(tabs) {
                    console.log('Send',request);
                chrome.tabs.sendMessage(tabs[0].id, request
                , 
                function(response) {
                  
                    console.log('Send');
                }
                );
            });
        }

    }
  );

function GetUrl(link){
    const index=link.lastIndexOf('#');
    let newLink=link;
    if(index!=-1){
        newLink=link.substring(0,index)
    }

    if(newLink.charAt(newLink.length-1)!='/'){
        return newLink+'/';
    }
    return newLink;
}

