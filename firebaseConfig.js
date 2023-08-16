// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTavHNmctJ5BaOxS9YwMD-SJQobac3eCk",
  authDomain: "reservation-af5d5.firebaseapp.com",
  projectId: "reservation-af5d5",
  storageBucket: "reservation-af5d5.appspot.com",
  messagingSenderId: "709558317270",
  appId: "1:709558317270:web:1aaa2520f5399b9ca19977",
  measurementId: "G-62L4KZ6FSJ",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
