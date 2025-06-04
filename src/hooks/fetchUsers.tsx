import { getDoc, getDocs , query, where } from 'firebase/firestore';
import React,{useState,useEffect} from 'react';
import { useAppSelector } from '../app/hooks';
import { userRef } from '../utils/FirebaseSetup';
import { userType } from '../utils/Types';


export default function useFetchUsers(){
const [users,setUsers]=useState<Array<userType>>([])
const uid=useAppSelector((meet)=>meet.auth.userInfo?.uid)

useEffect(()=>{
    if(uid){
        const getUsers=async ()=>{
            const firestoreQuery=query(userRef,where ('uid','!=',uid))
            const data=await getDocs(firestoreQuery)
            const firebaseUsers:Array<userType>=[]
            data.forEach((user)=>{
                const userData=user.data() as userType
                firebaseUsers.push({
                    ...userData,
                    label:userData.name
                })
            })
            setUsers(firebaseUsers)
        }
        getUsers()
    }
},[setUsers, uid])

return [users]
}
    
