import React, { use, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import LoginPage from '../pages/auth/Login'
import { useState } from 'react'
import AuthLoader from "./AuthLoader"
import { authContext } from '../context/authContex'

function ProtectedRoute({children}) {
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  const [loading , setLoading] = useState(true)
  const data = useContext(authContext)

  const checkAuth = async ()=>{
      setLoading(true)
      console.log("Context API AuthConetxt = ",data)
      
      if(data.isLoggedIn){
        setLoading(false)
        return;
      }
      const res = await axios.get(`${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/users/is-logged-in`,
      {
        withCredentials:true,
        headers:{
          "x-auth-check-type" : "login-check-hit"
        }
      }
    )

    console.log(res.data)
    setLoading(false)

    if(res?.data?.data?.isLoggedIn === true){
      data.setIsLoggedIn(true)
    }
    else{
      data.setIsLoggedIn(false)
    }

    return;

    }

 useEffect(()=>{

    const timer = setTimeout(()=>{checkAuth()},2000)
  return ()=> clearTimeout(timer)
 },[])

 useEffect(()=>{
    
 },[data.isLoggedIn])

 
 return loading && !data.isLoggedIn && <AuthLoader/> ||  !loading && !data.isLoggedIn && <LoginPage/> || !loading && data.isLoggedIn && children;

}
  
export default ProtectedRoute