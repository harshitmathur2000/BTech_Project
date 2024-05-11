// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyAe3v5PWKbn7zlK0LYY9gZcq0KNr-ZkTMI",
  authDomain: "college-exchange-hub.firebaseapp.com",
  projectId: "college-exchange-hub",
  storageBucket: "college-exchange-hub.appspot.com",
  messagingSenderId: "300253388761",
  appId: "1:300253388761:web:5d181addc64f188bce43c8",
  measurementId: "G-FN7B9FRD99"
};


const app = firebase.initializeApp(config);
const firestore = app.firestore();
const db = app.firestore();
const auth = firebase.auth();
const storage = getStorage(app);

export {app,auth,firestore,firebase, storage,db};