import React from 'react'
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


function BlogCard({ tags = ["#React", "#Javascript", "#Architecture", "#Performance"] }) {
    return (
        <div className="w-full bg-[#1f2936] rounded-lg border-[0.2px] border-gray-700">
            <div className="w-full relative">
                <div className="w-full ">
                <img
                    className='max-h-[180px] max-w-[1000px] w-full fit-cover rounded-tr-md rounded-tl-md'
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop" alt="" />
            </div>
                <div className="px-3 py-2 bg-[#19181e]/75 background-blur-md absolute top-5 right-5 rounded-xl">
                    8 min read
                </div>
            </div>

            <div className="w-full border-1 border-red-800 flex flex-col items-start gap-5 p-5 rounded-bl-md rounded-br-md">

                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-r from-[#4e76ef] to-[#8e3de6] rounded-[50%] flex justify-center items-center font-bold">SC</div>
                    <div className='flex flex-col'>
                        <div className="flex items-center gap-2 font-bold">
                            Sarah Chen
                            <svg className="w-4 h-4 rounded-[50%] text-white bg-blue-600 " fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>

                    <p className='text-sm text-gray-500'>2h ago . 12,500 followers</p>
                    </div>

                </div>
        

                    <h1 className='text-xl font-bold'>Building Scalable React Applications: A Complete Guide</h1>
                    <p className="max-w-[95%]">
                        Learn how to architect React applications that can grow with your team and user base. We'll cover component patterns, state management, and performance optimization techniques.
                    </p>

                    <div className="w-full flex items-center justify-start gap-5 px-3 ">
                        {
                            tags.map((tag, index) => (
                                <button key={index} className="">{tag}</button>
                            ))
                        }
                    </div>

                    <div className="w-full border-[1.2px] border-t-gray-600 border-r-0 border-l-0 border-b-0 pt-5 flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="text-gray-500 flex items-center gap-2">
                            <Heart size={19} className='text-gray-500'/>
                            180
                            </div>
                            <div className="text-gray-500 flex items-center gap-2">
                            <MessageCircle size={19} className='text-gray-500'/>
                            36
                            </div>
                            <div className="text-gray-500 flex items-center gap-2">
                            <Share2 size={19} className='text-gray-500'/>
                            180
                            </div>
                        </div>

                        <div className="flex text-gray-500 items-center gap-2">
                            <Eye size={19} className='text-gray-500'/>
                            2,800
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default BlogCard