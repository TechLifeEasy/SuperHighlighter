import { db, auth } from "../Firebase";
import firebase from 'firebase/compat/app';

const GetNoteRef = () => db.collection("Notes");
const GetWebSiteRef = () => db.collection('WebSites');


// UserNotes By WebLink
const GetNoteWebLinkUser = async ({ webLink }) => {

    if (!webLink) return;

    const user = auth.currentUser;
    let webId = await GetWebId(webLink);


    if (!webId) {
        webId = await CreateWebSite(webLink);
    }

    return await GetNote(webId, user.uid);

}


// Get Note By User_id and Web_id
const GetNote = async (webId, userId) => {

    console.log(userId,webId)

    const noteRef = GetNoteRef();
    const snapshot = await noteRef.where('webId', '==', webId).where('User_id', '==', userId).get();
    console.log(snapshot.docs)

    if (snapshot.empty) {
        return {};
    }
    const data = snapshot.docs[0];
    console.log(data.data());
    return data.data();
}




// get Node List
const GetNoteList = async (webLink) => {

    if (!webLink) return;
    const webId = await GetWebId(webLink);

    console.log(webId)

    const noteRef = GetNoteRef();
    const snapshot = await noteRef.where('webId', '==', webId).get();

    if (snapshot.empty) {
        return [];
    }

    return GetArrayBySnap(snapshot);
}




const GetWebId = async (webLink) => {

    const siteRef = GetWebSiteRef();
    let snapshot = await siteRef.where('link', '==', webLink).get();

    if (snapshot.empty) {
        return '';
    }

    const data = snapshot.docs[0];

    return data.id;


}


const GetArrayBySnap = (snapshot) => {
    let arr = [];

    const data = snapshot.docs;

    for (let i in data) {
        arr.push(data[i].data());
    }
    console.log(arr);
    return arr;
}


const CreateWebSite = async (webLink) => {

    const res = await GetWebSiteRef().add({
        link: webLink
    });

    console.log(res.id)

    return res.id;

}



const CreateUserWebData = async (webLink,Note=[]) => {

    const user = auth.currentUser;


    let webId = await GetWebId(webLink);

    console.log(webLink, webId)

    if (!webId) {
        webId = await CreateWebSite(webLink);
    }

    const snapshot = await GetNoteRef().where('webId', '==', webId).where('User_id', '==', user.uid).get();


    if (snapshot.empty) {
        const data = {
            webId: webId,
            User_displayName: user.displayName,
            User_id: user.uid,
            Note: Note
        }    
        await GetNoteRef().add(data);

        console.log(data)
        return;  
    }
    const dataDic = snapshot.docs[0];
    const id = dataDic.id;
    await GetNoteRef().doc(id).update({Note:Note});
    console.log('copy')


}


const UpdateUserWebData = async (webLink, data, type=null) => {

    if(type==null) return;

    const user = auth.currentUser;

    let webId = await GetWebId(webLink);


    if (!webId) {
        return;
    }


    const snapshot = await GetNoteRef().where('webId', '==', webId).where('User_id', '==', user.uid).get();


    if (snapshot.empty) {
        return {};
    }
    const dataDic = snapshot.docs[0];
    const id = dataDic.id;



    if (type) {
        await GetNoteRef().doc(id).update(
            {
                Note: firebase.firestore.FieldValue.arrayUnion(data)
            },
        )
    } else {

        await GetNoteRef().doc(id).update(
            {
                Note: firebase.firestore.FieldValue.arrayRemove(data)
            },
        )

    }

    console.log('update')

    return 'done';

}




export { GetNoteWebLinkUser, GetNoteList, CreateUserWebData, UpdateUserWebData };