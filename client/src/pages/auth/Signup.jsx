import React, { use } from "react";
import Input from "../../components/Input";
import axios from "axios"
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  UserCheck, 
  Code,
  ArrowRight,
  Github,
  Chrome,
  Loader
} from 'lucide-react';

function Signup() {

    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        username: "",
        fullName: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = React.useState(false);
    const [emailSent, setEmailSent] = React.useState(false);

    const clearForm = () => {
        setUser({
            username: "",
            fullName: "",
            email: "",
            password: ""
        });
    }

    const onChangeHandler = (e) => {
        setUser({...user , [e.target.name] : e.target.value })
    }

    React.useEffect(() => {
        if (emailSent) {
           navigate("/verify-confirm"); // Redirect to VerifyConfirm page after email is sent
        }
    }, [emailSent]);

    const onSubmitHandler = async() => {
        clearForm();
        setLoading(true);
        const res = await axios.post(`${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/users/register`,user)
        setEmailSent(true)
        Swal.fire({
                    title: 'Email Verification',
                    text: `Verification Link Sent on ${user.email}`,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    timer: 2000,
                    showConfirmButton: false,
                    position: 'top-end',
                    toast: true
                      });

        console.log("Response from server: ", res.data);
    }

    if(loading){
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 font-inter">
      <div className=" p-8 rounded-xl max-w-md w-full text-center animate-fadeIn">
        
        {/* Animated Mail Sending Icon */}
        <div className="flex justify-center mb-4">
          <svg
            className="animate-bounce h-14 w-14 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            role="status"
            aria-label="Sending verification link"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold mb-2">
          Sending Verification Link...
        </h1>
        <p className="text-gray-400">
          Hold tight! We’re delivering a secure link to your email.
        </p>
        <p className="text-blue-400 mt-2 text-sm">
          Please check your inbox (and spam folder).
        </p>
      </div>
    </div>
    
        )
    }

    return (
        <div className="w-[100vw] h-[100vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center">

             <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className=" w-[95%] sm:w-[55%] md:w-[45%] lg:w-[30%]  h-[80%] sm:h-[85%] md:h-[85%] lg:h-[85%] xl:h-[85%] 2xl:h-[75%] backdrop-blur-xl border border-gray-700/50 rounded-2xl flex flex-col p-3 gap-2 justify-center shadow-2xl">
                <header className="text-white text-3xl font-bold text-center py-2 font-mono ">Join DevMark 🚀</header>
                <div className="main  flex flex-col font-mono items-center gap-3">
                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="username" className="text-left">Username</label>
                       <div className="w-full bg-transparent border-2 border-[#3c4553] flex items-center px-3 rounded-xl">
                        <User className="text-gray-500"/>
                         <input
                            className=" mx-auto  bg-transparent w-full text-white p-3 rounded-lg outline-none"
                            type="text"
                            placeholder="Username"
                            value={user.username}
                            onChange={onChangeHandler}
                            name="username"
                        />
                       </div>
                    </div>
                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="fullName" className="text-left">Full Name</label>
                       <div className="w-full bg-transparent border-2 border-[#3c4553] flex items-center px-3 rounded-xl">
                        <User className="text-gray-500"/>
                         <input
                            className=" mx-auto  bg-transparent w-full text-white p-3 rounded-lg outline-none"
                            type="text"
                            placeholder="Full Name"
                            value={user.fullName}
                            onChange={onChangeHandler}
                            name="fullName"
                        />
                       </div>
                    </div>

                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="email" className="text-left">Email</label>
                       <div className="w-full bg-transparent border-2 border-[#3c4553] flex items-center px-3 rounded-xl">
                        <Mail className="text-gray-500"/>
                         <input
                            className=" mx-auto  bg-transparent w-full text-white p-3 rounded-lg outline-none"
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={onChangeHandler}
                            name="email"
                        />
                       </div>
                    </div>

                 

                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="password" className="text-left">Password</label>
                       <div className="w-full bg-transparent border-2 border-[#3c4553] flex items-center px-3 rounded-xl">
                        <Lock className="text-gray-500"/>
                         <input
                            className=" mx-auto  bg-transparent w-full text-white p-3 rounded-lg outline-none"
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={onChangeHandler}
                            name="password"
                        />
                    </div>
                    </div>

                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="confirm-password" className="text-left">Confirm Password</label>
                       <div className="w-full bg-transparent border-2 border-[#3c4553] flex items-center px-3 rounded-xl">
                        <Lock className="text-gray-500"/>
                         <input
                            className=" mx-auto  bg-transparent w-full text-white p-3 rounded-lg outline-none"
                            type="password"
                            placeholder="Confirm Password"
                            value={user.password} 
                            onChange={onChangeHandler}
                            name="confirm-password"
                        />
                    </div>
                    </div>

                    <button className="w-[90%] sm:w-[70%] bg-gradient-to-r from-[#7a3bed] via-[#02d6ff] to-[#02d6ff] text-white text-lg font-bold p-2 rounded-lg m-2 hover:bg-gradient-to-l"
                        onClick={onSubmitHandler} disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                    <p className="text-white font-mono">Already have an account ? <span className="text-[#04d8ff] cursor-pointer">Login</span></p>

                </div>
            </div>
        </div>
    )
}

export default Signup;