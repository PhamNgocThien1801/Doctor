import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdZOkPKAKSHgJ1OOe-blRWgMLZSOwZk0Y",
  authDomain: "reactnative-mma.firebaseapp.com",
  projectId: "reactnative-mma",
  storageBucket: "reactnative-mma.appspot.com",
  messagingSenderId: "16204299766",
  appId: "1:16204299766:web:af10c545db9acdf4349bd7",
  measurementId: "G-85X4K3GCEV",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Firebase Realtime Database
const db = firebase.database();

export { auth, db };
