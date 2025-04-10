import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcylRbc2wbYbqYRgfDObMrnzBcClVlgLs",
    authDomain: "interestlink-44d65.firebaseapp.com",
    projectId: "interestlink-44d65",
    storageBucket: "interestlink-44d65.firebasestorage.app",
    messagingSenderId: "23578595177",
    appId: "1:23578595177:web:cdfb4b58254f30b24eb7f8",
    measurementId: "G-FXPLX53DVZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // For auth features later