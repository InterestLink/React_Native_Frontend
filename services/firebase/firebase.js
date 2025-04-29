import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FIREBASE_CONFIG } from "@env";

// Firebase configuration
const firebaseConfig = FIREBASE_CONFIG

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // For auth features later