// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {collection,getFirestore} from 'firebase/firestore'



// Initialize Firebase

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId:  process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId:  process.env.REACT_APP_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app)
export const db=getFirestore(app)
export const userRef=collection(db,'users')
export const meetingsRef=collection(db,'meetings')
