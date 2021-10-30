import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDZLB6y1rn1CAGHEpcwPmdJhVIXp8ArJs4",
    authDomain: "notes-8d5eb.firebaseapp.com",
    projectId: "notes-8d5eb",
    storageBucket: "notes-8d5eb.appspot.com",
    messagingSenderId: "299160559140",
    appId: "1:299160559140:web:30358642f3ade7072d42b1"
};



const app = initializeApp(firebaseConfig);
const auth=app.auth();
const db=app.firestore();

export { db, auth }