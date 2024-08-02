// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';  // Import Firebase Storage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjnB0EqlxfMituNfBR8BmoZXzisZz2tQY",
  authDomain: "mairafrontline.firebaseapp.com",
  projectId: "mairafrontline",
  storageBucket: "mairafrontline.appspot.com",
  messagingSenderId: "165746557358",
  appId: "1:165746557358:web:11a4363dc460a65aa9483f",
  measurementId: "G-92CXZCKHDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Get Firebase Storage

const analytics = getAnalytics(app);
export { storage };
