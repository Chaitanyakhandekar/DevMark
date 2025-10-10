import React, { useState, useEffect } from 'react';
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
  MapPin,
  ExternalLink as LinkIcon,
  Mail,
  MoreHorizontal,
  Edit,
  Trash2,
  Grid,
  List,
  Activity
} from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import MobileNavBottom from '../../../components/MobileNavBottom';

function ProfilePage() {

    const [activeTab,setActiveTab] = useState("posts");

    const skills = ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Docker", "AWS"];

    const handleTabChange = (e)=>{
        setActiveTab(e.target.name)
    }

  return (
    <div className='w-screen h-auto bg-[#111825] z-100 flex flex-col pb-20'>
            {/* Cover Photo */}
            <section className="w-[95%] md:w-[70%] lg:w-[60%] xl:w-[65%] mx-auto mt-4 rounded-md py-3 px-x">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop"
                     alt=""
                    className="w-full h-auto rounded-md" />
            </section>

            {/* User Info */}
            <section className="w-[95%] md:w-[70%] lg:w-[60%] xl:w-[65%] mx-auto mt-4 rounded-md  py-3 px-5 bg-[#1f2935]">

                <div className=" m-2 flex flex-col md:flex-row md:gap-1">

                    {/* Avatar and Name */}
                    <div className="border-1 flex justify-center items-center">
                        <div className="border-1 w-40 h-40 border-1 flex justify-center items-center rounded-[50%]  relative z-50">
                            <div className="w-[80%] h-[80%] border-1 rounded-[50%] overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=byte_coder"
                                     alt=""
                                     className="w-full h-full object-cover rounded-[50%] z-20" />
                            </div>
                            <LinkIcon className='absolute bottom-4 right-4 bg-gradient-to-r from-[#4777f4] to-[#9035ea] p-1 rounded-[50%] text-white cursor-pointer hover:bg-gray-700 p-2' size={33} />  
                        </div>
                    </div>

                    {/* Name and Bio */}
                    <div className=" w-full flex flex-col gap-2">

                        {/* Name and Username */}
                        <div className="w-full h-auto  py-1">
                            <h1 className="text-xl md:text-2xl text-white mb-1">Byte Coder</h1>
                            <p className="text-sm md:text-md text-gray-400">@byte_coder</p>
                        </div>
                        
                        {/* Bio */}
                        <div className="text-md md:text-md text-white/70  py-1 max-w-[95%]  lg:max-w-[90%]">Full Stack Developer | Open Source Enthusiast | Building scalable web applications with React, Node.js, and TypeScript</div>
    
                        {/* Location and Join Date */}
                        <div className=" py-1 flex items-center gap-5">
                            <div className="flex items-center ">
                                <MapPin size={19} className='text-gray-400 mr-1 mt-1' />
                                <p className="text-sm md:text-md text-gray-400">San Francisco, CA</p>
                            </div>

                            <div className="flex items-center">
                                <Calendar size={19} className='text-gray-400 mr-1 mt-1' />
                                <p className="text-sm md:text-md text-gray-400">Joined January 2020</p>
                            </div>
                        </div>

                        {/* Links */}
                        <div className=" py-1 flex items-center gap-3 py-1">
                           <FaGithub size={20} className='text-gray-400 cursor-pointer hover:text-white' />
                           <FaTwitter size={20} className='text-gray-400 cursor-pointer hover:text-white' />
                           <FaLinkedin size={20} className='text-gray-400 cursor-pointer hover:text-white' />
                        </div>

                        {/* Skills */}
                        <div className=" py-1 flex flex-col flex-wrap gap-2">
                            <h1 className="text-md md:text-md text-white mb-1">Skills</h1>
                            <div className="w-full border-1 flex flex-wrap gap-2 p-3 rounded-md">
                              {skills.map((skill, index) => (
                                <span key={index} className="bg-[#202f4e] text-[#4fa5eb] text-sm px-3 py-1 rounded-full">{skill}</span>
                            ))}
                          </div>
                        </div>

                    </div>
                </div>

                <div className="border-2 border-t-gray-700 border-b-0 border-l-0 border-r-0 p-3 flex justify-around mt-3">
                    
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-0">
                            <BookOpen size={20} className='inline mr-2 text-gray-400' />
                            <p className='text-sm md:text-lg text-white font-bold'>120</p>
                        </div>
                        <p className="text-sm md:text-md text-gray-400">Posts</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-0">
                            <Users size={20} className='inline mr-2 text-gray-400' />
                            <p className='text-sm md:text-lg text-white font-bold'>5.2K</p>
                        </div>
                        <p className="text-sm md:text-md text-gray-400">Followers</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-0">
                            <User size={20} className='inline mr-2 text-gray-400' />
                            <p className='text-sm md:text-lg text-white font-bold'>300</p>
                        </div>
                        <p className="text-sm md:text-md text-gray-400">Following</p>
                    </div>

                     <div className="flex flex-col items-center">
                        <div className="flex items-center gap-0">
                            <Bookmark size={20} className='inline mr-2 text-gray-400' />
                            <p className='text-sm md:text-lg text-white font-bold'>151</p>
                        </div>
                        <p className="text-sm md:text-md text-gray-400">Saved</p>
                    </div>
                    
                       

                </div>

            </section>

            {/* User Posts */} 
            <section className="w-[95%] md:w-[70%] lg:w-[60%] xl:w-[65%] mx-auto mt-4   bg-[#1f2935] px-3">
                    <div className="flex justify-start gap-5 items-center border-[1px] border-b-gray-500 border-t-0 border-l-0 border-r-0">
                        <button
                         className={`text-sm md:text-[1.1rem] font-[500] text-[#9ca3ae] mb-0 pb-5 px-3 pt-3 h-full ${activeTab==="posts" ? "border-2 border-b-[#4083f2] border-t-0 border-r-0 border-l-0 text-[#4083f2]" : "border-none text-[#9ca3ae]"}`}
                         name="posts"
                         onClick={handleTabChange}
                         >
                            Posts
                        </button>

                        <button
                         className={`text-sm md:text-[1.1rem] font-[500] text-[#9ca3ae] mb-0 pb-5 px-3 pt-3 h-full ${activeTab==="saved" ? "border-2 border-b-[#4083f2] border-t-0 border-r-0 border-l-0 text-[#4083f2]" : "border-none text-[#9ca3ae]"}`}
                         name="saved"
                         onClick={handleTabChange}
                        >
                        Saved
                        </button>

                        <button
                         className={`text-sm md:text-[1.1rem] font-[500] text-[#9ca3ae] mb-0 pb-5 px-3 pt-3 h-full ${activeTab==="drafts" ? "border-2 border-b-[#4083f2] border-t-0 border-r-0 border-l-0 text-[#4083f2]" : "border-none text-[#9ca3ae]"}`}
                         name="drafts"
                         onClick={handleTabChange}
                         >
                        Drafts
                        </button>
                    </div>
            </section>

           <div className="block md:hidden fixed bottom-0 w-full">
             <MobileNavBottom avatarUrl={"https://api.dicebear.com/7.x/avataaars/svg?seed=byte_coder"} />
           </div>
    </div>
  )
}

export default ProfilePage