// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';  // Import Firebase Storage

// Your web app's Firebase configuration
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

// Conditionally import and initialize Firebase Analytics on the client side
let analytics;
if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}

export { app, storage, analytics };
