// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApo6kvowrrwXFe2YLIxplJTcjIcakpc2c",
  authDomain: "react-curso-8b5e1.firebaseapp.com",
  projectId: "react-curso-8b5e1",
  storageBucket: "react-curso-8b5e1.appspot.com",
  messagingSenderId: "862138427705",
  appId: "1:862138427705:web:ae929b3274154e4e0aa0e8",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
