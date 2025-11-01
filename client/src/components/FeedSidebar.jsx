import React from 'react'
import { BookOpen, Pen, Bookmark , Search, User} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function FeedSidebar({
  activePage = "all"
}) {
  const navigate = useNavigate();

  return (
    <div className="w-60 border-[0.2px] border-gray-700 dark:bg-[#1f2936] sticky top-0 flex flex-col gap-3 pt-5 pb-7 px-3 rounded-md sticky top-2">
            <h1 className='font-bold'>Quick Actions</h1>

            <div
              onClick={()=>navigate("/user/feed")}
              className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${activePage === "all" ? "bg-gray-700" : ""} rounded-md`}>
              <BookOpen size={19} />
              <h1>All Blogs</h1>
            </div>
            <div
              onClick={()=>navigate("/user/search")}
              className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${activePage === "search" ? "bg-gray-700" : ""} rounded-md`}>
              <Search size={19} />
              <h1>Search</h1>
            </div>
            <div
            onClick={()=>{navigate("/user/blogs/create")}}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${activePage === "create" ? "bg-gray-700" : ""} rounded-md`}>
              <Pen size={19} />
              <h1 className="">Write Blog</h1>
            </div>
            <div
            onClick={()=>navigate("/user/blogs")}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${activePage === "my-blogs" ? "bg-gray-700" : ""} rounded-md`}>
              <BookOpen size={19} />
              <h1 className="">My Blogs</h1>
            </div>
            <div
              onClick={()=>{navigate("/user/saved-blogs")}}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${activePage === "saved" ? "bg-gray-700" : ""} rounded-md`}>
              <Bookmark size={19} />
              <h1 className="">Saved Blogs</h1>
            </div>
            <div
              onClick={()=>{navigate("/user/saved-blogs")}}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${activePage === "saved" ? "bg-gray-700" : ""} rounded-md`}>
              <User size={19} />
              <h1 className="">Profile</h1>
            </div>
          </div>

  )
}

export default FeedSidebar