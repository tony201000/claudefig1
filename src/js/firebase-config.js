// Firebase configuration
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
firebase.initializeApp(firebaseConfig);

// Initialize Analytics
export const analytics = getAnalytics(app);

// Initialize Firestore and Auth
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

// You can export these services if you need to use them in other files
// export { db, auth, analytics };