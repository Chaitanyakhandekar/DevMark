import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import LoginPage from '../pages/auth/Login'
import { useState } from 'react'
import AuthLoader from "./AuthLoader"

function ProtectedRoute({children}) {
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  const [loading , setLoading] = useState(true)

  const checkAuth = async ()=>{
      setLoading(true)
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
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }

    }

 useEffect(()=>{

    checkAuth();

 },[])

 
 return loading && !isLoggedIn && <AuthLoader/> ||  !loading && !isLoggedIn && <LoginPage/> || !loading && isLoggedIn && children;


}
  
export default ProtectedRoute