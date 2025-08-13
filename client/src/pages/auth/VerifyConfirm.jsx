import React from "react";

const VerifyConfirm = () => {
   return(
    <div className="h-[100vh] w-[100vw] bg-[#030712] flex justify-center items-center">
        <div className="bg-[#111827] w-full max-w-md p-5 text-white font-mono flex flex-col justify-between items-center gap-6 rounded-md m-3">
            <h1 className="text-2xl font-extrabold text-center">Verify Your Email</h1>
            <p className="text-gray-400 text-sm text-center"> We've sent a verification link to <span className="text-blue-400">chaitanyakhandekar95@gmail.com</span>.
          Please check your inbox (and spam folder) to complete verification.</p>

          <button className="bg-[#2563eb] text-white text-md font-bold font-mono p-3 rounded-md">I have Verified My Email</button>
        </div>
    </div>
   )
};

export default VerifyConfirm;
