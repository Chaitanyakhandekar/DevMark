import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


export default function LoginPage() {

  const navigate = useNavigate();
  const [user,setUser] = React.useState({ email: "", password: "" });

  const handleChange = (e)=>{
    setUser((prev)=>(
      {...prev , [e.target.name] : e.target.value}
    ))
    
  }

  const handleLogin = async(e) => { 
    e.preventDefault();
    console.log("Logging in with:", user);
    const res = await axios.post(`${import.meta.env.VITE_ENV ==="production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/users/login`, user , {withCredentials:true})
    console.log(res.data);
  }

  return (
    <div className="min-h-screen bg-[#0F111A] flex items-center justify-center px-4 font-mono">
      <div className="w-full max-w-md bg-[#1A1D29] rounded-2xl shadow-lg p-8 border border-gray-800">
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
            className="w-full py-2 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#00D8FF] text-white font-semibold hover:opacity-90 transition"
            onClick={handleLogin}
          >
            Login
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