import { EuiThemeColorMode } from '@elastic/eui'
import React, { Suspense,useState,useEffect } from 'react'

const LightTheme=React.lazy(()=>import('../Themes/LightTheme'))
const DarkTheme=React.lazy(()=>import('../Themes/DarkTheme'))

function ThemeSelector({
    children
}:{
    children:React.ReactNode
}) {
   const [theme,setTheme]=useState<EuiThemeColorMode>('light')

   useEffect(()=>{
     const theme=localStorage.getItem('meet-theme')
     if(theme){
        setTheme(theme as EuiThemeColorMode)
     }

   },[])


  return (
   <>
   <Suspense fallback={<></>}>
   {theme==='dark' ? <DarkTheme/> : <LightTheme/>}
   </Suspense>
   {children}
   </>
  )
}


export default ThemeSelector
