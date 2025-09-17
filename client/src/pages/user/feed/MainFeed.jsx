import React, { useState } from 'react'
import {
  Search,
  Bell,
  BookOpen,
  Bookmark,
  User,
  Settings,
  LogOut,
  Home,
  Edit3,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  TrendingUp,
  Calendar,
  Filter,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  Code,
  Zap,
  Coffee,
  Briefcase,
  Github,
  ExternalLink,
  Clock,
  Users,
  Tag,
  Plus,
  Star,
  MoveDown
} from 'lucide-react';

function MainFeed() {

  const [searchFocused, setSearchFocused] = React.useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);


  const toggleDarkMode = () => {
    setIsDark(!isDark);
  }

  const handleTheme = () => {
    const html = document.documentElement

    if (html.classList.contains("dark")) {
      setIsDark(false)
      html.classList.remove("dark")
      html.classList.add("light")
    } else {
      setIsDark(true)
      html.classList.remove("light")
      html.classList.add("dark")
    }
  }

  return (
    <div className="main-feed w-screen h-screen dark:bg-[#111826]">

      {/* Navbar */}
      <nav className="w-full h-[4rem] bg-[#1f2936] flex items-center justify-center gap-5 px-4 sticky top-0 z-50">

        <div className="h-full flex justify-center items-center gap-2">
          <div className=" h-10 sm:h-10 w-10 sm:w-10 flex justify-center items-center bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-mono font-bold rounded-md">
            {'<>'}
          </div>
          <div className="text-white text-2xl sm:text-2xl font-bold">
            DevMark
          </div>
        </div>

        <div className={`flex w-[25%] text-gray-400  ${searchFocused ? "border-2 border-blue-600" : "border-[0.2px] border-gray-600 "} px-3 py-2 rounded-md gap-2`}>
          <Search />
          <input
            className='bg-transparent border-none outline-none w-full'
            type="text"
            onFocus={() => {
              setSearchFocused(true);
            }}
            onBlur={() => {
              setSearchFocused(false);
            }}
            placeholder='search by title,tags,author...' />
        </div>

        <div className=' flex items-center gap-3'>
          <div className='flex items-center gap-2 text-white hover:text-blue-500 cursor-pointer'>
            <Home className=' cursor-pointer' size={20} />
            Home
          </div>
          <h1 className='text-white hover:text-blue-500 cursor-pointer'>Categories</h1>
          <div className="flex items-center gap-2 text-white hover:text-blue-500 cursor-pointer">
            <Edit3 className='text-white hover:text-blue-500 cursor-pointer' size={20} />
            Write
          </div>
          <div className="flex items-center gap-2 text-white hover:text-blue-500 cursor-pointer">
            <Bookmark className=' cursor-pointer' size={20} />
            Bookmarks
          </div>
        </div>

        <div
          onClick={handleTheme}
          className="border-[1.2px] border-gray-500 dark:border-gray-600 w-8 h-8 flex justify-center items-center rounded-md bg-[#182231] dark:bg-[#182231] cursor-pointer">
          {
            !isDark && <Moon className="text-gray-500 " size={20} />
          }
          {
            isDark && <Sun className="text-yellow-500" size={20} />
          }
        </div>



        <div className="flex items-center gap-5 relative">

          <div className="w-7 h-7  hover:bg-gray-700 flex justify-center items-center rounded-md relative ">
            <Bell className='text-gray-400 cursor-pointer' size={20} />
            <div className='w-3 h-3 rounded-[50%] bg-red-500 absolute top-[-0.4rem] right-[-0.5rem]'></div>
          </div>

          <button className="text-white bg-gradient-to-r from-[#4777f4] to-[#9035ea] px-4 py-2 rounded-md">Write Blog</button>

          <div
          onClick={()=>{
            setIsProfileMenuOpen(!isProfileMenuOpen)
          }}
          className={`flex items-center gap-2 hover:bg-gray-700 ${isProfileMenuOpen ? "bg-gray-700" : ""} px-2 py-1 rounded-md cursor-pointer`}>
            <div className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-bold rounded-[50%] w-9 h-9 flex justify-center items-center">JD</div>
            <ChevronDown className='text-gray-400 cursor-pointer' size={20} />
          </div>

          {/* Dropdown Menu */}
          <div className={`${isProfileMenuOpen ? "block" : "hidden"}  bg-[#1f2936] absolute right-0 bottom-[-8.9rem] text-white w-60 rounded-md flex flex-col gap-3 shadow-lg p-3`}>
            <div className='flex items-center gap-2'>
              <User size={20} />
              <h1>Profile</h1>
            </div>

            <div className='flex items-center gap-2'>
              <Settings size={20} />
              <h1>Settings</h1>
            </div>

            <div className='flex items-center gap-2 border-t border-gray-600 pt-2 cursor-pointer'>
              <LogOut className='text-red-500' size={20} />
              <h1 className='text-red-500'>Logout</h1>
            </div>
          </div>

        </div>

      </nav>

    </div>
  )
}

export default MainFeed