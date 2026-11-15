import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration loaded from environment variables (.env.local)
// matching the registered Web App 'MSR Portfolio Web' (Project: msr-portfolio-5c52f)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBOavwmwHmozhivMLy0nrRMtQqULaGdr_E",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "msr-portfolio-5c52f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "msr-portfolio-5c52f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "msr-portfolio-5c52f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "797615036695",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:797615036695:web:2dcca8b071ea50bd6a7f52",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-K7F1BB7HGY"
};

// Initialize Firebase App (only once)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication (only once)
const auth = getAuth(app);

// Initialize Cloud Firestore (only once)
const db = getFirestore(app);

// Export initialized services
export { app, auth, db, firebaseConfig };
export default app;
