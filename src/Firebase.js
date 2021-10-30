// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';




const firebaseConfig = {
    apiKey: "AIzaSyDZLB6y1rn1CAGHEpcwPmdJhVIXp8ArJs4",
    authDomain: "notes-8d5eb.firebaseapp.com",
    projectId: "notes-8d5eb",
    storageBucket: "notes-8d5eb.appspot.com",
    messagingSenderId: "299160559140",
    appId: "1:299160559140:web:30358642f3ade7072d42b1"
};



const app = firebase.initializeApp(firebaseConfig);
const auth=app.auth();
const db=app.firestore();

export { db, auth }