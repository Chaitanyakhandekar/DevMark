import React, { useEffect, useState } from 'react'
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
  MoveDown,
  Pen
} from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

import {logout} from '../../../services/logout.service'
import BlogCard from '../../../components/BlogCard';
import DefaultProfile from '../../../components/DefaultProfile';
import ProfileMeta from '../../../components/ProfileMeta';
import FollowerProfileMeta from '../../../components/feed page/FollowerProfileMeta';
import EventMetaCard from '../../../components/feed page/EventMetaCard';
import { useNavigate } from 'react-router-dom';
import MobileNavBottom from '../../../components/MobileNavBottom';
import axios from 'axios';

function MainFeed() {

  const [searchFocused, setSearchFocused] = React.useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [allBlogs, setAllBlogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [loading,setLoading] = useState(false)
  const [userAvatar,setUserAvatar] = useState("")
  const [followStatus,setFollowStatus] = useState({})
  const navigate = useNavigate();

  const categories = [
    { name: "All", icon: <Home size={16} />, totalPosts: 1200 },
    { name: "Javascript", icon: <Code size={16} />, totalPosts: 800 },
    { name: "React", icon: <Zap size={16} />, totalPosts: 600 },
    { name: "Node.js", icon: <Briefcase size={16} />, totalPosts: 400 },
    { name: "Career", icon: <Coffee size={16} />, totalPosts: 300 },
    { name: "Open Source", icon: <FaGithub size={16} />, totalPosts: 200 },
  ]

  const trendingTags = [
    { name: "#WebDev", totalPosts: 1200 },
    { name: "MachineLearning", totalPosts: 800 },
    { name: "#DevOps", totalPosts: 600 },
    { name: "#CloudComputing", totalPosts: 400 },
    { name: "#Debugging", totalPosts: 300 },
    { name: "#Performance", totalPosts: 200 },
    { name: "#Mobile", totalPosts: 100 },
  ]

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



  const loadFollowStatus = (blogs)=>{

    blogs.forEach((blog)=>{
      setFollowStatus(
        (prev)=>{
          return {
            ...prev,
            [blog.owner._id]:blog.owner.isFollowed
          }
        }
      )
    })

    console.log("Follow Status = ",followStatus)

  }

  const fetchAllBlogs = async()=>{
    try {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/blogs/all?page=${page}&limit=${limit}`,{
        withCredentials:true
      })

      console.log("blogs : ",res.data.data.blogs)
  
      setAllBlogs(res.data.data.blogs)
      
      loadFollowStatus(res.data.data.blogs)

      setLoading(false)

     

    } catch (error) {
      setLoading(false)
      console.log("Error :: Fetching All Blogs :: ",error.message)
    }
  }

  const fetchUserAvatar = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/users/avatar`, {
        withCredentials: true
      })

      // Set the user avatar in the state
      setUserAvatar(res.data.avatar)

    } catch (error) {
      console.log("Error :: Fetching User Avatar :: ", error.message)
    }
  }

  useEffect(()=>{
    fetchAllBlogs()
    fetchUserAvatar()
  },[])

  useEffect(()=>{
    fetchAllBlogs()
  },[limit])

  return (
    <div className="main-feed w-screen min-w-screen bg-[#f4f2ee] dark:bg-[#111826]">

      {/* Navbar */}
      <nav className="hidden md:block w-full h-[4rem] bg-[#1f2936] md:flex md:items-center md:justify-center md:gap-5 md:px-0 md:sticky md:top-0 z-50">

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

          <button
          onClick = {()=>{
            navigate("/user/blogs/create")
          }}
          className="text-white bg-gradient-to-r from-[#4777f4] to-[#9035ea] px-4 py-2 rounded-md">Write Blog</button>

          <div
            onClick={() => {
              setIsProfileMenuOpen(!isProfileMenuOpen)
              document.querySelector(".arrow-down").classList.toggle("rotate-180")
            }}
            className={`flex items-center gap-2 hover:bg-gray-700 ${isProfileMenuOpen ? "bg-gray-700" : ""} px-2 py-1 rounded-md cursor-pointer`}>
            <div className=" text-white font-bold rounded-[50%] w-9 h-9 flex justify-center items-center">
              <img
              className='w-full h-full rounded-[50%] object-cover'
              src={userAvatar} alt="" />
            </div>
            <ChevronDown
            className='arrow-down text-gray-400 cursor-pointer' size={20} />
          </div>

          {/* Dropdown Menu */}
          <div className={`${isProfileMenuOpen ? "block" : "hidden"}  bg-[#1f2936] cursor-pointer absolute right-0 bottom-[-8.9rem] text-white w-60 rounded-md flex flex-col gap-3 shadow-lg p-3`}>
            <div
            onClick={()=>{navigate("/user/profile")}}
            className='flex items-center gap-2'>
              <User size={20} />
              <h1>Profile</h1>
            </div>

            <div className='flex items-center gap-2'>
              <Settings size={20} />
              <h1>Settings</h1>
            </div>

            <div className='flex items-center gap-2 border-t border-gray-600 pt-2 cursor-pointer'>
              <LogOut className='text-red-500' size={20} />
              <button
              onClick={()=>{logout(); navigate("/login")}}
              className='text-red-500'>Logout</button>
            </div>
          </div>
        </div>

      </nav>


      {/* Main Content */}
      <main className='border-1 w-full min-h-screen flex justify-center items-start gap-3 relative'>

        {/* Section 1 Left Sidebar*/}
        <section className='hidden sm:hidden md:block border-1 border-blue-700 text-black dark:text-white md:flex md:flex-col md:gap-5 md:py-3 sticky top-20'>

          {/* Categories */}
          {/* <div className="w-60 flex flex-col gap-3 py-3 px-5 text-md items-start  border-[0.2px] border-gray-700 dark:bg-[#1f2936] rounded-md">

            <div className=" flex items-center gap-3 font-bold">
              <Filter size={20} className='font-bold' />
              Categories
            </div>

            {
              categories.map((category, index) => (
                <div
                  className={`w-full flex items-center justify-between px-2 py-2 rounded-md text-black dark:text-white   ${activeCategory === category.name ? "bg-[#4b78ef] text-white" : ""}`}
                  onClick={() => { setActiveCategory(category.name); console.log(activeCategory) }}
                  key={index}>
                  <div className="flex items-center gap-2 px-2 py-1">
                    {category.icon}
                    <h1>{category.name}</h1>
                  </div>
                  <p className='text-sm text-gray-300'>{category.totalPosts}</p>
                </div>
              ))
            }

          </div> */}

          {/* Trending Tags */}
          {/* <div className="w-60 border-[0.2px] border-gray-700 text-md dark:bg-[#1f2936] flex flex-col items-start justify-start gap-3 py-3 px-3 rounded-md">
            <div className="flex items-center gap-3 font-bold py-3 px-2">
              <TrendingUp size={20} />
              <h1>Trending Tags</h1>
            </div>

            {
              trendingTags.map((tag, index) => (
                <div
                  className="w-full text-start px-3"
                  key={index}
                >
                  <p className="">{tag.name}</p>
                </div>
              ))
            }
          </div> */}


          {/*Quick actions */}

          <div className="w-60 border-[0.2px] border-gray-700 dark:bg-[#1f2936] sticky top-0 flex flex-col gap-3 pt-5 pb-7 px-3 rounded-md sticky top-2">
            <h1 className='font-bold'>Quick Actions</h1>

            <div
            onClick={()=>{navigate("/user/blogs/create")}}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-700 rounded-md">
              <Pen size={19} />
              <h1 className="">Write Blog</h1>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-700 rounded-md">
              <BookOpen size={19} />
              <h1 className="">My Blogs</h1>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-700 rounded-md">
              <Bookmark size={19} />
              <h1 className="">Saved Blogs</h1>
            </div>
          </div>

        </section>

        {/* Section 2 Feed */}
        <section className='md:w-[20%] max-w-[700px] min-w-[250px] border-1 border-red-700 flex-1 flex flex-col gap-3 md:px-5 py-3 '>

          {/* Feed Filter */}
          {/* <div className="hidden md:block sticky top-5 md:top-20 z-10 mb-5 border-[0.2px] border-gray-700 bg-gray-700/70 backdrop-blur-md text-white w-full max-w-[1000px] h-16 md:flex items-center justify-between gap-5 px-5 rounded-md">

            <div className="flex items-center gap-3">
              <h1>Sort by:</h1>

              <select className='bg-[#1f2936] border-[0.2px] border-gray-600 p-2 rounded-md' name="" id="">
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
                <option value="Most Viewed">Most Viewed</option>
                <option value="Most Liked">Most Liked</option>
                <option value="Most Commented">Most Commented</option>
              </select>
            </div>

            <div className="flex items-center">
              <Clock size={16} className='inline-block mr-1 text-gray-500' />
              <p className='text-sm text-gray-900 dark:text-gray-500 '>Last Updated : 2 minutes ago</p>
            </div>
          </div> */}

          <div className="w-full border-1 border-white text-white flex flex-col items-center gap-5 mt-5">
            
            {
              allBlogs.length!==0 && allBlogs.map((blog)=>(
               <div
                key={blog._id}
               className="w-full">
                 <BlogCard
                 key={blog._id}
                title={blog.title}
                imgUrl={blog.images?.length? blog.images[0].url : ""}
                description={blog.content}
                likes={blog.totalLikes}
                comments={blog.totalComments}
                tags={blog.tags}
                views={blog.views}
                owner={blog.owner}
                followStatus={followStatus}
                setFollowStatus={setFollowStatus}
                createdAt={blog.createdAt}
                />
               </div>
            ))}

            <button
            onClick={()=>{
              setLimit((prev)=>prev+prev)
            }}
            className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-bold p-3 rounded-md ">{loading ? "Loading..." : "Load More Posts"}</button>
          </div>

        </section>


        {/* Section 3 Right Sidebar */}
        <section className="hidden sm:hidden lg:block w-[18%] max-w-[350px] border-1 border-blue-700 text-black dark:text-white lg:flex lg:flex-col lg:gap-5 lg:py-3 sticky top-20">

          {/* Trending This Week */}
          {/* <div className="w-full border-[0.4px] border-gray-700 flex flex-col items-start gap-7 pl-5 pt-7 pb-10 rounded-md dark:bg-[#1f2936]">
            <div className="flex items-center gap-3 font-bold">
              <TrendingUp className='font-bold' size={19} />
              Trending This Week
            </div>

            Profile Section  ================= This is a comment ==============
            <ProfileMeta
              title={"Understanding Async/Await in JavaScript"}
              views={"52.3k"}
              username={"Jane Doe"}
              profileText='JD'
            />
            <ProfileMeta
              title={"10 VS Code Extensions Every Developer Needs"}
              views={"45.8k"}
              username={"Tech Insider"}
              profileText='1'
            />
            <ProfileMeta
              title={"Why TypeScript is Taking Over JavaScript"}
              views={"38.7k"}
              username={"Code Masters"}
              profileText='2'

            />
            <ProfileMeta
              title={"Building Your First Docker Container"}
              views={"29.3k"}
              username={"DevOps Daily"}
              profileText='3'

            />

          </div> */}


          {/* Suggested Developers */}
          <div className="w-full border-[0.4px] border-gray-700 flex flex-col items-start gap-7 pl-5 pt-7 pb-10 rounded-md dark:bg-[#1f2936]">
            <div className="flex items-center gap-3 font-bold">
              <Users className='font-bold' size={19} />
              Suggested Developers
            </div>

            <FollowerProfileMeta
              username={"DevOps Daily"}
              role={"Full Stack dev"}
              followers={"29.3k"}
              profileText='JS'
            />
            <FollowerProfileMeta
              username={"Emma Wilson"}
              followers={"29.3k"}
              role={"React Expert"}
              profileText='EW'
            />
            <FollowerProfileMeta
              username={"David Park"}
              followers={"18.7k"}
              role={"DevOps Engineer"}
              profileText='DP'
            />

            

          </div>

          {/* Upcoming Events */}

          {/* <div className="w-full border-[0.4px] border-gray-700 flex flex-col items-start gap-7 pl-5 pt-7 pr-5 pb-10 rounded-md dark:bg-[#1f2936] sticky top-20">
            <div className="flex items-center gap-3 font-bold">
              <Calendar className='font-bold' size={19} />
              Upcomming Events
            </div>

            <EventMetaCard
              title="React Conf 2025"
              time="March 15-16, Virtual"
              bg="bg-[#222a45]"
              border="border-[#233fa0]"
              linkColor="text-[#62a5f6]"
            />
            <EventMetaCard
              title="Open Source Summit"
              time="March 15-16, Virtual"
              bg="bg-[#1a3137]"
              border="border-[#184936]"
              linkColor="text-[#44dd7b]"
            />
            <EventMetaCard
              title="AI & Dev Summit"
              time="May 10-12, Online"
              bg="bg-[#32273c]"
              border="border-[#602692]"
              linkColor="text-[#c286ec]"
            />
          </div> */}

        </section>

      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNavBottom avatarUrl={userAvatar} />

    </div>
  )
}

export default MainFeed