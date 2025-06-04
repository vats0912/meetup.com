import React, { useEffect,useState } from 'react';
import './App.css';
import { EuiProvider, EuiThemeProvider,EuiThemeColorMode, EuiGlobalToastList } from '@elastic/eui';
import "@elastic/eui/dist/eui_theme_dark.json"
import "@elastic/eui/dist/eui_theme_light.json"
import { Routes,Route } from 'react-router';
import { Login } from './pages/login';
import Dashboard from './pages/Dashboard';
import { AppDispatch } from './app/store';
import { useAppDispatch, useAppSelector } from './app/hooks';
import ThemeSelector from './Themes/ThemeSelector';
import CreateMeeting from './pages/CreateMeeting';
import Create1on1 from './pages/Create1on1';
import { setToasts } from './app/slices/MeetingSlice';
import VideoConference from './pages/VideoConference';
import MyMeetings from './pages/MyMeetings';
import Meetings from './pages/Meetings';
import JoinMeeting from './pages/JoinMeeting';

function App() {
   const dispatch=useAppDispatch()
   const toasts=useAppSelector((meet)=>meet.meeting.toasts)
   const isDarkTheme=useAppSelector((meet)=>meet.auth.isDarkTheme)
   const [theme,setTheme]=useState<EuiThemeColorMode>('light')
   const [initialTheme,setIsInitialTheme]=useState(true)

  useEffect(()=>{
  const theme=localStorage.getItem('meet-theme')
  if(theme){
    setTheme(theme as EuiThemeColorMode)
  }

  else{
    localStorage.setItem('meet-theme','light')
  }
   },[])

   useEffect(()=>{
     if(initialTheme){
      setIsInitialTheme(false)
     }
     else{
      window.location.reload()
     }
   },[isDarkTheme])
  const overrides={
    color:{
      LIGHT:{primary:'#0b5cff'},
      DARK:{primary:'#0b5cff'}
    },
  }
 
  const removeToast=(removeToast:{id:string})=>{
     dispatch(
      setToasts(
        toasts.filter((toast:{id:string})=>toast.id!==removeToast.id)
      )
     )
  }

  return (
    <ThemeSelector>
    <EuiProvider colorMode={theme}>
    <div className="App">
      <EuiThemeProvider modify={overrides}>
     <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create' element={<CreateMeeting/>}/>
      <Route path='/create1on1' element={<Create1on1/>}/>
      <Route path='/videoconference' element={<VideoConference/>}/>
      <Route path='/mymeetings' element={<MyMeetings/>}/>
      <Route path='/meetings' element={<Meetings/>}/>
      <Route path='/join/:id' element={<JoinMeeting/>}/>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='*' element={<Dashboard/>}/>
    
     </Routes>
     <EuiGlobalToastList 
       toasts={toasts}
       dismissToast={removeToast}
       toastLifeTimeMs={5000}
     />
     </EuiThemeProvider>
    </div>
    </EuiProvider>
    </ThemeSelector>
  );
}

export default App;
