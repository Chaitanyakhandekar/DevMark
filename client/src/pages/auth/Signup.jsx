import React from "react";
import Input from "../../components/Input";

function Signup() {

    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    return (
        <div className="w-[100vw] h-[100vh] bg-[#0f111a] flex justify-center items-center">
            <div className=" w-[100%] sm:w-[55%] md:w-[45%] lg:w-[30%]  h-full sm:h-[75%] md:h-[75%] lg:h-[75%] xl:h-[70%] 2xl:h-[65%]  bg-[#1a1d29] rounded-2xl flex flex-col p-3 gap-2 justify-center">
                <header className="text-white text-3xl font-bold text-center py-2 font-mono ">Join DevMark 🚀</header>
                <div className="main  flex flex-col font-mono items-center gap-3">
                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="username" className="text-left">Username</label>
                        <input
                            className="border-2 mx-auto border-[#374151] bg-[#1a1d29] w-full text-white p-2 rounded-lg m-2 outline-none"
                            type="text"
                            placeholder="Username"
                            value={user.username} />
                    </div>

                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="email" className="text-left">Email</label>
                        <input
                            className="border-2 mx-auto border-[#374151] bg-[#1a1d29] w-full text-white p-2 rounded-lg m-2"
                            type="email"
                            placeholder="Email"
                            value={user.email} />
                    </div>

                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="password" className="text-left">Password</label>
                        <input
                            className="border-2 mx-auto border-[#374151] bg-[#1a1d29] w-full text-white p-2 rounded-lg m-2"
                            type="password"
                            placeholder="Password"
                            value={user.password} />
                    </div>

                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="confirm-password" className="text-left">Confirm Password</label>
                        <input
                            className="border-2 mx-auto border-[#374151] bg-[#1a1d29] w-full text-white p-2 rounded-lg m-2"
                            type="password"
                            placeholder="Confirm Password"
                            value={user.password} />
                    </div>

                    <button className="w-[90%] sm:w-[70%] bg-gradient-to-r from-[#7a3bed] via-[#02d6ff] to-[#02d6ff] text-white text-lg font-bold p-2 rounded-lg m-2">
                        Create Account
                    </button>

                    <p className="text-white font-mono">Already have an account ? <span className="text-[#04d8ff] cursor-pointer">Login</span></p>

                </div>
            </div>
        </div>
    )
}

export default Signup;