// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {collection,getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCt_xvP4fzcYSRaGP69jI6JbVKlE-7pbwQ",
  authDomain: "meetup-com.firebaseapp.com",
  projectId: "meetup-com",
  storageBucket: "meetup-com.firebasestorage.app",
  messagingSenderId: "146264501170",
  appId: "1:146264501170:web:476d004a9145437b4a12ab"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app)
export const db=getFirestore(app)
export const userRef=collection(db,'users')
export const meetingsRef=collection(db,'meetings')
