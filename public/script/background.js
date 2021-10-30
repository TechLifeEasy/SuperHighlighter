/*Crating the Context Menu*/

window.chrome.contextMenus.create({
    id: "note-op",
    title: 'Add to Note',
    contexts: ["selection"]
});

window.chrome.contextMenus.onClicked.addListener(getData)


function getData(information) {
    if (information.menuItemId === "note-op") {
        // console.log("Word " + information.selectionText + " was clicked.");
        console.log('send')
        const data = information.selectionText;

        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            const link = tabs[0].url;
            const info = {
                msg: 'Add_Note',
                data: data,
                link: link
            }

            console.log(info)
            chrome.runtime.sendMessage({ info });
        });
    }
}
