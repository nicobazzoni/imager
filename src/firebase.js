// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { GoogleAuthProvider } from "firebase/auth";





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD030tMgRSjr6vzTcPG0T0svel8srxMF6U",
  authDomain: "r3fimager.firebaseapp.com",
  projectId: "r3fimager",
  storageBucket: "r3fimager.appspot.com",
  messagingSenderId: "989588444500",
  appId: "1:989588444500:web:d180034cf43e00585124c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();

export const firestore = firebase.firestore();

export const provider = new GoogleAuthProvider();  

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp(); 




