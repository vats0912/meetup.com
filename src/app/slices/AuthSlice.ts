import { createSlice } from "@reduxjs/toolkit";

interface authInitialState {
    userInfo:{
        uid:string;
        name:string;
        email:string;
    } | undefined
    isDarkTheme:boolean
}

const initialState:authInitialState={
    userInfo:undefined,
    isDarkTheme:false
};

export const authSlice=createSlice(
    {
        name:"auth",
        initialState,
        reducers: {
            changeTheme:(state,action)=>{
                state.isDarkTheme=action.payload.isDarkTheme
            },

            setUser:(state,action)=>{
                state.userInfo=action.payload
            }
        },
    }
)

export const {setUser,changeTheme}=authSlice.actions