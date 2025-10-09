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
    Star
} from 'lucide-react';
import axios from 'axios';
import { getTimeAgo } from '../services/timeAgo.service';


function BlogCard({
    title,
    description,
    imgUrl,
    tags = ["#react", "#javascript", "#webdev"],
    likes = 0,
    comments = 0,
    views = 0,
    owner = "",
    followStatus,
    setFollowStatus,
    createdAt

}) {

    const [isFollowed, setIsFollowed] = useState(owner.isFollowed)
    const handleFollow = async () => {
        console.log(owner._id)
        try {
            const res = await axios.post(`${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/followers/follow/${owner._id}`, {}, {
                withCredentials: true
            })

            console.log(res.data)

            setFollowStatus(prev=>(
                {
                    ...prev,
                    [owner._id]:true
                }
            ))
            setIsFollowed(true)

        } catch (error) {
            console.log("HandleFollow :: Error :: ", error.message)
        }

    }

    return (
        <div className="w-[100%] md:w-full dark:bg-[#1f2936] md:rounded-lg md:dark:border-[0.2px] dark:border-gray-700">
            <div className="w-full relative">
                <div className="w-full flex justify-center">
                    <img
                        className='max-h-[180px] max-w-[1000px] w-[95%] md:w-full h-auto fit-cover rounded-tr-md rounded-tl-md'
                        src={imgUrl} alt="" />
                </div>
                <div className="px-3 py-2 bg-[#19181e]/75 background-blur-md absolute top-5 right-5 rounded-xl">
                    8 min read
                </div>
            </div>

            <div className="w-full border-1 border-red-800 flex flex-col items-start gap-5 p-5 rounded-bl-md rounded-br-md text-black dark:text-white">

                <div className="flex items-center gap-3 ">

                    <div className="w-11 h-11  rounded-[50%] flex justify-center items-center font-bold text-white">
                        <img
                            className='w-full h-full rounded-[50%] object-cover'
                            src={`${owner.avatar}`} alt="" />
                    </div>

                    <div className='flex flex-col'>
                        <div className="flex items-center gap-2 font-bold">
                            {owner.username}
                            <svg className="w-4 h-4 rounded-[50%] text-white bg-blue-600 " fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <p className='text-sm text-gray-500'>{getTimeAgo(createdAt)} . {owner.totalFollowers} followers</p>
                    </div>

                    <button
                        disabled={followStatus[owner._id]}
                        onClick={handleFollow}
                        className={`text-sm text-gray-500 cursor-pointer ml-5 ${followStatus[owner._id] ? "bg-gray-600" : "bg-blue-600"} rounded-md px-3 py-1 text-white`}>{followStatus[owner._id] ? "Following" : "Follow"}</button>

                </div>


                <h1 className='text-xl font-bold'>{title}</h1>
                <p className="max-w-[95%]">
                    {description}
                </p>

                <div className="w-full flex items-center flex-wrap justify-start gap-5 px-3 ">
                    {
                        tags.map((tag, index) => (
                            <button key={index} className="">{"#" + tag}</button>
                        ))
                    }
                </div>

                <div className="w-full border-[1.2px] border-t-gray-600 border-r-0 border-l-0 border-b-0 pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="text-gray-500 flex items-center gap-2">
                            <Heart size={19} className='text-gray-500' />
                            {likes}
                        </div>
                        <div className="text-gray-500 flex items-center gap-2">
                            <MessageCircle size={19} className='text-gray-500' />
                            {comments}
                        </div>
                        <div className="text-gray-500 flex items-center gap-2">
                            <Share2 size={19} className='text-gray-500' />
                            180
                        </div>
                    </div>

                    <div className="flex text-gray-500 items-center gap-2">
                        <Eye size={19} className='text-gray-500' />
                        {views}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard