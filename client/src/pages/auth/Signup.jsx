import React from "react";
import Input from "../../components/Input";

function Signup(){

    const [user,setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    return (
        <div className="w-[100vw] h-[100vh] bg-[#0f111a] flex justify-center items-center">
            <div className=" w-[30%] h-[60%] bg-[#1a1d29] rounded-lg flex flex-col gap-2">
                <header className="text-white text-3xl font-bold text-center py-2 font-mono border-2 ">Join DevMark 🚀</header>
                <div className="main border-2">
                    <input
                     type="text"
                    placeholder="Username"
                    value />

                    <input
                     type="email"
                    placeholder="Email"
                    value />

                    <input
                     type="password"
                    placeholder="Password"
                    value />

                </div>
            </div>
        </div>
    )
}

export default Signup;