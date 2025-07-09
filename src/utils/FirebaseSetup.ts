// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {collection,getFirestore} from 'firebase/firestore'



// Initialize Firebase

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId:  process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId:  process.env.APP_ID
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app)
export const db=getFirestore(app)
export const userRef=collection(db,'users')
export const meetingsRef=collection(db,'meetings')
