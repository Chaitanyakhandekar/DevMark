import React from "react";
import { createContext } from "react";

export const authContext = createContext(null)     // created Auth Context with default value null

export const AuthProvider = ({children})=>{      // AuthProvider component to wrap around the app

    const [isLoggedIn,setIsLoggedIn] = React.useState(false)

    return (
        <authContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}         
        </authContext.Provider>
    )
}