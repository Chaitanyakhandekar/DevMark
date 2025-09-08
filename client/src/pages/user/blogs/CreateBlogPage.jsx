import React, { useEffect } from 'react'
import { 
  Save, 
  Eye, 
  EyeOff, 
  Bold, 
  Italic, 
  Code, 
  Link2, 
  List, 
  ListOrdered, 
  Quote, 
  Image, 
  Heading1, 
  Heading2, 
  Heading3,
  ArrowLeft,
  Settings,
  Tag,
  Globe,
  Lock,
  Clock,
  X,
  Plus
} from 'lucide-react';

function CreateBlogPage() {

    useEffect(() => {
        const html = document.documentElement
        html.classList.add("dark")
    }, [])
    return (
        <div className="min-w-screen min-h-screen dark:bg-[#111826]">

            {/* Desktop Navbar */}
            <nav className='w-full h-10 py-8 border-[0.2px] border-b-gray-600 border-l-0 border-r-0 border-t-0 flex justify-around items-center'>
                <div className=" h-full flex  items-center gap-2">
                    <div className=" h-8 sm:h-8 w-8 sm:w-8 flex justify-center items-center bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-mono font-bold rounded-md">
                        {'<>'}
                    </div>
                    <div className="text-black dark:text-white text-xl sm:text-xl font-bold">
                        DevMark
                    </div>
                </div>

                <div className="h-full text-black dark:text-white flex gap-10 text-sm">
                    <div className="h-full flex gap-2 items-center text-gray-400">
                        <Clock size={15}/>
                        <p>0 words . 0 min read</p>
                    </div>

                    <div className="h-full flex items-center gap-5 text-gray-300">
                        <div className='p-2 hover:bg-gray-600 hover:p-2 hover:rounded-md transition-all duration-5'>
                            <Eye size={22}/>
                        </div>

                        <div className='p-2 hover:bg-gray-600 hover:p-2 hover:rounded-md transition-all duration-5'>
                            <Settings size={22} />
                        </div>
                    </div>

                    <div className="h-full flex items-center gap-3 ">
                        <button className='text-md px-3 py-2 hover:bg-gray-600 rounded-md'>Save Draft</button>
                        <button className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white  font-semibold rounded-md px-3 text-lg py-1">Publish</button>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default CreateBlogPage