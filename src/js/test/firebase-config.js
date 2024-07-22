// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, doc, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpCxVRxvUiskME7iwFVz_6hMcPRnH4apQ",
    authDomain: "blindboxcollection-6a548.firebaseapp.com",
    projectId: "blindboxcollection-6a548",
    storageBucket: "blindboxcollection-6a548.appspot.com",
    messagingSenderId: "336289874791",
    appId: "1:336289874791:web:3f4f537bdaeffe9e76a5c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, getDocs, getDoc };
