/*Crating the Context Menu*/

// eslint-disable-next-line no-undef
chrome.contextMenus.create({
    id: "log-selection",
    title: 'Add to Note',
    contexts: ["selection"],
    onclick: getData
});


function getData(information) {
    console.log("Word " + information.selectionText + " was clicked.");
}
