// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkM_vrcmBSbc9zO3KcroCqwbF5Mr5Nvbg",
  authDomain: "react-course-ed6d1.firebaseapp.com",
  projectId: "react-course-ed6d1",
  storageBucket: "react-course-ed6d1.appspot.com",
  messagingSenderId: "289622162081",
  appId: "1:289622162081:web:1c9934c44fc9b21c4c4ee0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)