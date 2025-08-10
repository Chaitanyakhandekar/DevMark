import React from "react";
import Input from "../../components/Input";
import axios from "axios"
import Swal from 'sweetalert2';

function Signup() {

    const [user, setUser] = React.useState({
        username: "",
        fullName: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = React.useState(false);

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

    const onSubmitHandler = async() => {
        clearForm();
        setLoading(true);
        const res = await axios.post("https://devmark-8het.onrender.com/api/v1/users/register",user)
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

    return (
        <div className="w-[100vw] h-[100vh] bg-[#0f111a] flex justify-center items-center">
            <div className=" w-[100%] sm:w-[55%] md:w-[45%] lg:w-[30%]  h-full sm:h-[85%] md:h-[85%] lg:h-[85%] xl:h-[85%] 2xl:h-[75%]  bg-[#1a1d29] rounded-2xl flex flex-col p-3 gap-2 justify-center">
                <header className="text-white text-3xl font-bold text-center py-2 font-mono ">Join DevMark 🚀</header>
                <div className="main  flex flex-col font-mono items-center gap-3">
                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="username" className="text-left">Username</label>
                        <input
                            className="border-2 mx-auto border-[#374151] bg-[#1a1d29] w-full text-white p-2 rounded-lg m-2 outline-none"
                            type="text"
                            placeholder="Username"
                            value={user.username}
                            onChange={onChangeHandler}
                            name="username"
                        />
                    </div>
                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="fullName" className="text-left">Full Name</label>
                        <input
                            className="border-2 mx-auto border-[#374151] bg-[#1a1d29] w-full text-white p-2 rounded-lg m-2 outline-none"
                            type="text"
                            placeholder="Full Name"
                            value={user.fullName}
                            onChange={onChangeHandler}
                            name="fullName"
                        />
                    </div>

                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="email" className="text-left">Email</label>
                        <input
                            className="border-2 mx-auto border-[#374151] bg-[#1a1d29] w-full text-white p-2 rounded-lg m-2 outline-none"
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={onChangeHandler}
                            name="email"
                        />
                    </div>

                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="password" className="text-left">Password</label>
                        <input
                            className="border-2 mx-auto border-[#374151] bg-[#1a1d29] w-full text-white p-2 rounded-lg m-2 outline-none"
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={onChangeHandler}
                            name="password"
                        />
                    </div>

                    <div className="flex flex-col text-white justify-center items w-[95%] ">
                        <label htmlFor="confirm-password" className="text-left">Confirm Password</label>
                        <input
                            className="border-2 mx-auto border-[#374151] bg-[#1a1d29] w-full text-white p-2 rounded-lg m-2 outline-none"
                            type="password"
                            placeholder="Confirm Password"
                            value={user.password} 
                            onChange={onChangeHandler}
                            name="confirm-password"
                        />
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