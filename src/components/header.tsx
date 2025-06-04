import React,{useEffect, useState} from 'react'
import { Link, useLocation, useNavigate, } from 'react-router-dom';
import {  useAppSelector } from '../app/hooks'
import { useDispatch } from 'react-redux'
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiText, EuiTextColor } from '@elastic/eui'
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseSetup';
import { changeTheme } from '../app/slices/AuthSlice';
import { getCreateMeetingBreadCrumbs, getVideoConferenceBreadCrumbs,getOneOnOneMeetingBreadCrumbs, getMyMeetingsBreadCrumbs, getMeetingsBreadCrumbs } from '../utils/breadCrumbs';

function Header() {
    const navigate=useNavigate()
    const location=useLocation()
    const user=useAppSelector((meet)=>meet.auth.userInfo?.name)
    const isDarkTheme=useAppSelector((meet)=>meet.auth.isDarkTheme)
    const [breadCrumbs,setBreadCrumbs]=useState([{text:'Dashboard'}])
    const [isResponsive, setisResponsive] = useState(false)
    const dispatch=useDispatch()
    const logout=async ()=>{
    await signOut(firebaseAuth)
    navigate('/login')
    }

    useEffect(()=>{
     const {pathname}=location
     if(pathname==='/create'){
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate))
     }

     else if(pathname==='/create1on1'){
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate))
     }

     else if(pathname==='/videoconference'){
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate))
     }

     else if(pathname==='/mymeetings'){
      setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate))
     }
  
     else if(pathname==='/meetings'){
      setBreadCrumbs(getMeetingsBreadCrumbs(navigate))
     }

    },[location,navigate])

    const invertTheme=()=>{
      const theme=localStorage.getItem('meet-theme')
      localStorage.setItem('meet-theme',theme ==='light' ? 'dark' :'light')
      dispatch(changeTheme({isDarkTheme:!isDarkTheme}))
    }
    const section =[{
      items:[
        <Link to='/'>
        <EuiText>
          <h2 style={{padding:'0 1vw'}}>
          <EuiTextColor color='#0b5cff'>
            Meetup.com
          </EuiTextColor>
          </h2>
        </EuiText>
        </Link>
      ]
    },

    {
      items:[
        <>
        {
          user ? (
            <EuiText>
              <h3>
                <EuiTextColor color='green'>Hello, </EuiTextColor>
                <EuiTextColor>{user}</EuiTextColor>
              </h3>
            </EuiText>
          ):null 
        }
        </>
      ]
      },

      {
       items:[
        <EuiFlexGroup justifyContent='center' alignItems='center' direction='row' style={{gap:'2vw'}}>
           <EuiFlexItem grow={false} style={{flexBasis:'fit-content'}}>
            <EuiButtonIcon onClick={logout} iconType='lock' size='s'display='fill' aria-label='logout-button'/>
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{flexBasis:'fit-content'}}>
              {isDarkTheme ?
            <EuiButtonIcon onClick={invertTheme}  iconType='sun' size='s' display='fill' color='warning' aria-label='theme-button'/>
            :
            <EuiButtonIcon onClick={invertTheme} iconType='moon' size='s' display='fill' color='primary' aria-label='theme-button'/>
              }
           </EuiFlexItem>
        </EuiFlexGroup>
       ]
      }
  
  ]

    const responsiveSection=[{
      items:[
        <Link to='/'>
        <EuiText>
          <h2 style={{padding:'0 1vw'}}>
          <EuiTextColor color='#0b5cff'>
            Meetup.com
          </EuiTextColor>
          </h2>
        </EuiText>
        </Link>
      ]
    },

    {
      items:[
        <>
        {
          user ? (
            <EuiText>
              <h3>
                <EuiTextColor color='green'>Hello, </EuiTextColor>
                <EuiTextColor>{user}</EuiTextColor>
              </h3>
            </EuiText>
          ):null 
        }
        </>
      ]
      },

      {
       items:[
        <EuiFlexGroup justifyContent='center' alignItems='center' direction='row' style={{gap:'2vw'}}>
           <EuiFlexItem grow={false} style={{flexBasis:'fit-content'}}>
            <EuiButtonIcon onClick={logout} iconType='lock' size='s'display='fill' aria-label='logout-button'/>
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{flexBasis:'fit-content'}}>
              {isDarkTheme ?
            <EuiButtonIcon onClick={invertTheme}  iconType='sun' size='s' display='fill' color='warning' aria-label='theme-button'/>
            :
            <EuiButtonIcon onClick={invertTheme} iconType='moon' size='s' display='fill' color='primary' aria-label='theme-button'/>
              }
           </EuiFlexItem>
        </EuiFlexGroup>
       ]
      }
  ]

    useEffect(()=>{
       if(window.innerWidth<480){
        setisResponsive(true)
       }
    },[])
  return (
   <>
   <EuiHeader style={{minHeight:"8vh"}}  sections={(isResponsive ? responsiveSection:section)} />
   <EuiHeader style={{minHeight:"8vh"}} sections={[{breadcrumbs:breadCrumbs}]}/>
   </>
  )
}


export default Header
