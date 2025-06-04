import React from "react";
import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from "@elastic/eui";
import animation  from "../assets/animation.gif";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { firebaseAuth,userRef } from "../utils/FirebaseSetup";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";


export const Login=()=>{
const navigate=useNavigate()
const dispatch=useAppDispatch()

onAuthStateChanged(firebaseAuth,((currentUser)=>
{
   if(currentUser){
      navigate('/')
   }
}))

// Login logic
const loginLogic=async()=>{
     const provider=new GoogleAuthProvider()
     const {user:{displayName,email,uid}}=await signInWithPopup(firebaseAuth,provider)
     if(email){
        const firestoreQuery=query(userRef,where('uid','==', uid))
        const fetchedData=await getDocs(firestoreQuery)
        if(fetchedData.docs.length===0){
         await addDoc(userRef,{
            uid,
            name:displayName,
            email
         })
        }
     }
     dispatch(setUser({uid,name:displayName,email}))
navigate("/")
    }

    return (
       <EuiProvider colorMode="dark">
        <EuiFlexGroup alignItems="center" justifyContent="center" style={{width:'100vw', height:'100vh'}}>
     <EuiFlexItem grow={false}>
        <EuiPanel paddingSize="xl">
        <EuiFlexGroup alignItems="center" justifyContent="center">
        <EuiFlexItem>
     <EuiImage src={animation} alt='logo'/>
     </EuiFlexItem>
     <EuiFlexItem>
        <EuiText textAlign="center" grow={false}>
    <h2>
     <EuiTextColor color="#008000">MEETUP.COM</EuiTextColor>
     </h2>
     </EuiText>
    <EuiSpacer size='xs'/>
    <EuiText textAlign="center" grow={false}>
     <h3>
    <EuiTextColor>One Platform to</EuiTextColor>
    <EuiTextColor color="#0b5cff">Connect</EuiTextColor>
     </h3>
    </EuiText>
    <EuiSpacer size='l'/>
    <EuiButton fill onClick={loginLogic}>Login with Google</EuiButton>
    </EuiFlexItem>
        </EuiFlexGroup>
        </EuiPanel>
     </EuiFlexItem>
        </EuiFlexGroup>
       </EuiProvider>
    )
}