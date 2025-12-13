import React,{useContext} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import TestLoader from "../../test/TestLoader";
import { userApi } from "../../api/user.api";
import { authContext } from "../../context/authContex";
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage({nextPage="/user/feed"}) {

  const navigate = useNavigate();
  const [user,setUser] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const authData = useContext(authContext)

  const handleChange = (e)=>{
    setUser((prev)=>(
      {...prev , [e.target.name] : e.target.value}
    ))
    
  }

  const isLoggedInUser = async ()=>{
      const res = await userApi.isLoggedInUser();

      if(res.data.isLoggedIn){
        navigate(nextPage);
      }else{
        isLoggedInUser();
      }
  }

  const handleLogin = async(e) => { 
    e.preventDefault();
    setLoading(true);
    console.log("Logging in with:", user);

    const res = await userApi.loginUser(user)
    console.log("After Login Request = ",res);
    console.log("After Login Request Failed = ",res.message);
    setLoading(false);

    if(res.data.data && res.data.data.isVerified === false){

      await Swal.fire({
        icon: 'warning',
        title: 'Email Not Verified',
        text: 'Please verify your email to login.',
        confirmButtonText: 'Resend Verification Email'
      }).then( async (result) => {
        if (result.isConfirmed) {
          // Resend verification email
          const res = await axios.post(`${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/users/email/resend-verification`, { email: user.email });
          console.log("Resend Verification Response :: ", res.data.success);

          if(res.data.success){
          localStorage.setItem("emailForVerification" , user.email);
             await Swal.fire({
              icon: 'success',
              title: 'Verification Email Sent',
              text: 'Please check your email to verify your account.',
            });

            navigate("/verify-confirm");
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to resend verification email. Please try again later.',
            });
          }
        }
      });

    }

   else if(res.data.success){
      authData.setIsLoggedIn(true);
    //  await Swal.fire({
    //     icon: 'success',
    //     title: 'Login Successful',
    //     text: 'Welcome back!',
    //     timer:900
    //   });

    //   Swal.close();
      // localStorage.setItem("isLoggedInUser","yesLoggedIn")
    //  await isLoggedInUser();
      const logged = await isLoggedInUser();
      if(logged) navigate(nextPage);
      else navigate(nextPage); // fallback
      // console.log("wswwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww  ;; ",res.data.isLoggedIn )
      // navigate(nextPage);
    }else{
        if(res?.data?.data?.message ){
          setErrorMessage(res.data.data.message);
        }
        else if (res?.data?.message ){
          setErrorMessage(res.data.message);
        }
        else{
          setErrorMessage("Login failed. Please try again.");
            await Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
        });
        }
      
    }
  }

  return (
    <div className="min-h-screen bg-[#0F111A] flex items-center justify-center px-4 font-mono relative z-10">

      <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

      <div className="w-full max-w-md  rounded-2xl shadow-lg p-8 border-2 border-gray-800 backdrop-blur-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          DevMark <span className="text-[#00D8FF]">🚀</span>
        </h1>
        <form className="space-y-5">
          <div>
            <label className="text-gray-300 block mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-[#00D8FF]"
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-12 bg-transparent border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-[#00D8FF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-[#00D8FF] transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={user.email.trim() === "" || user.password.trim() === "" || loading}
            className={`w-full py-2 rounded-lg bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-semibold hover:opacity-90 transition flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed`}
            onClick={handleLogin}
          >
            {loading ? 
            <div className="text-blue-600 w-6 h-6 border-2 border-t-gray-600 border-r-gray-600 border-gray-800  animate-spin rounded-3xl"></div> : "Login"}
          </button>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-center gap-2">
                                <div className="w-1 h-8 bg-red-500 rounded-full"></div>
                                <p className="text-red-400 text-sm">{errorMessage}</p>
                            </div>
          )}
        </form>
        <p className="text-center text-gray-400 mt-6">
          Don't have an account? {" "}
          <a href="/signup" className="text-[#00D8FF] hover:underline">
            Sign up
          </a>
        </p>
      
        <p className="text-center text-gray-400 mt-2">
          <a href="/forgot-password" className="text-[#00D8FF] hover:underline">
            Forgot Password?
          </a>
        </p>
        
      </div>
    </div>
  );
}