import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import TestLoader from "../../test/TestLoader";
import { userApi } from "../../api/user.api";


export default function LoginPage({nextPage="/user/feed"}) {

  const navigate = useNavigate();
  const [user,setUser] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e)=>{
    setUser((prev)=>(
      {...prev , [e.target.name] : e.target.value}
    ))
    
  }

  const handleLogin = async(e) => { 
    e.preventDefault();
    setLoading(true);
    console.log("Logging in with:", user);

    const res = await userApi.loginUser(user)
    console.log(res.data);
    setLoading(false);

    if(res.success){
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
        timer:900
      });
      navigate(nextPage);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: res.data.message || 'Something went wrong!',
      });
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
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-[#00D8FF]"
            />
          </div>
          <button
            type="submit"
            disabled={user.email === "" || user.password === "" || loading}
            className={`w-full py-2 rounded-lg bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-semibold hover:opacity-90 transition flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed`}
            onClick={handleLogin}
          >
            {loading ? 
            <div className="text-blue-600 w-6 h-6 border-2 border-t-gray-600 border-r-gray-600 border-gray-800  animate-spin rounded-3xl"></div> : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Don't have an account? {" "}
          <a href="/signup" className="text-[#00D8FF] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}