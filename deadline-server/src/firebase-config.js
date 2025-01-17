// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};
/*
const firebaseConfig = {
  apiKey: "AIzaSyC7t4NvueyHuq86-ylgQWyDhTFtCFuseQ8",
  authDomain: "deadline-app-5f10e.firebaseapp.com",
  projectId: "deadline-app-5f10e",
  storageBucket: "deadline-app-5f10e.firebasestorage.app",
  messagingSenderId: "54748569245",
  appId: "1:54748569245:web:d8e567a0f15799a88b3e74"
};
*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);