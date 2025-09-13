import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import LoginPage from '../pages/auth/Login'
import { useState } from 'react'

function ProtectedRoute({children}) {
  const [isLoggedIn , setIsLoggedIn] = useState(null)
 useEffect(()=>{


    const checkAuth = async ()=>{
        const res = await axios.get(`${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/users/is-logged-in`,
      {
        withCredentials:true,
        headers:{
          "x-auth-check-type" : "login-check-hit"
        }
      }
    )
    console.log(res.data)

    if(res.data.data.isLoggedIn === true){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }

    }

    checkAuth();

  

 },[])

   if(isLoggedIn){
      return children
    }

    return <LoginPage/>
}

export default ProtectedRoute