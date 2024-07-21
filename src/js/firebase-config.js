// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Add the Firebase products that you want to use

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpCxVRxvUiskME7iwFVz_6hMcPRnH4apQ",
  authDomain: "blindboxcollection-6a548.firebaseapp.com",
  projectId: "blindboxcollection-6a548",
  storageBucket: "blindboxcollection-6a548.appspot.com",
  messagingSenderId: "336289874791",
  appId: "1:336289874791:web:3f4f537bdaeffe9e76a5c2",
  measurementId: "G-GSNNFF3BWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

