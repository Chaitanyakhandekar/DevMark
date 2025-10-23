import React from 'react'
import { Home, Search, Plus, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function MobileNavBottom({avatarUrl, fixed=false}) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  }

  return (
    <div
     className={`md:hidden border-[0.1px] border-t-gray-700 border-r-0 border-l-0 border-b-0 w-full h-16 bg-[#1f2936]/70 backdrop-blur-md ${fixed ? "fixed bottom-0" : "sticky bottom-0 left-0"} z-50 flex items-center justify-around text-gray-400`}
    
     >
        <Home
        onClick={()=>{handleNavigate("/user/feed")}}
        size={20} className='cursor-pointer hover:text-white' />
        <Search
        onClick={()=>{handleNavigate("/user/search")}}
        size={20}
        className='cursor-pointer hover:text-white' />
        <div
        onClick={()=>{handleNavigate("/user/blogs/create")}}
        className="p-1 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-[50%] text-white flex justify-center items-center">
          <Plus size={18} className='cursor-pointer hover:text-white' />
        </div>
        <Bookmark size={20} className='cursor-pointer hover:text-white' />
        <div
          onClick={() => {
            setIsProfileMenuOpen(!isProfileMenuOpen)
            handleNavigate("/user/profile")
          }}
          className={`flex items-center gap-2 hover:bg-gray-700 ${isProfileMenuOpen ? "bg-gray-700" : ""} px-2 py-1 rounded-md cursor-pointer`}>
          <div className=" text-white font-bold rounded-[50%] w-6 h-6 flex justify-center items-center text-sm">
            <img
            className='w-full h-full rounded-[50%]'
            src={avatarUrl || "https://res.cloudinary.com/drftighpf/image/upload/v1751458090/f5ozv63h6ek3ujulc3gg.jpg"} alt="" />
          </div>
        </div>
      </div>
  )
}

export default MobileNavBottom