// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {collection,getFirestore} from 'firebase/firestore'



// Initialize Firebase

const firebaseConfig = {
// firebase project keys
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app)
export const db=getFirestore(app)
export const userRef=collection(db,'users')
export const meetingsRef=collection(db,'meetings')
