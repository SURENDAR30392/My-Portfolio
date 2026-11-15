import { app, auth, db, firebaseConfig } from '../firebase/firebase.js';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp, 
  query, 
  orderBy,
  where 
} from 'firebase/firestore';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

// Check if real config is provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes('Dummy')
);

let googleProvider = null;
const storage = null;
const storageRef = null;
const uploadBytes = null;
const getDownloadURL = null;
const deleteObject = null;
try {
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
} catch (error) {
  console.warn("⚠️ Google Auth Provider init notice:", error.message);
}

export { 
  app, 
  db, 
  auth, 
  storage, 
  googleProvider,
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp, 
  query, 
  orderBy,
  where,
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  storageRef, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
};

