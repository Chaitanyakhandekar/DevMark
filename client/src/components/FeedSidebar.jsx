import React from 'react'
import { X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function FeedSidebar({
  activePage = "all",
  sidebarOpen = true,
  setSidebarOpen = () => {}
}) {
  const navigate = useNavigate();

  const menuItems = [
    { id: "all", icon: "📚", label: "All Blogs", route: "/user/feed" },
    { id: "search", icon: "🔍", label: "Search", route: "/user/search" },
    { id: "create", icon: "✍️", label: "Write Blog", route: "/user/blogs/create"},
    { id: "update", icon: "✏️", label: "Update Blog", route: "/user/blogs/update"},
    { id: "my-blogs", icon: "📖", label: "My Blogs", route: "/user/blogs" },
    { id: "saved", icon: "🔖", label: "Saved Blogs", route: "/user/saved-blogs" },
    { id: "profile", icon: "👤", label: "Profile", route: "/user/profile" }
  ];

  return (
    <aside className={`
      fixed top-0 left-0 h-screen w-64 z-100 
      bg-gradient-to-b from-[#1f2936] to-[#161d28]
      border-r border-gray-700/50
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0
      shadow-2xl
    `}>
      {/* Sidebar Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex justify-center items-center bg-white/20 backdrop-blur-sm text-white font-mono font-bold rounded-lg shadow-lg">
              {'<>'}
            </div>
            <div>
              <h1 className='font-bold text-lg text-white tracking-wide'>DevMark</h1>
              <p className='text-xs text-white/80'>Create & Share</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white/80 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1 p-3 mt-2">
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className={`
                ${activePage!=="update" && item.id=="update" ? "hidden" : ""}
                group relative flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-300 ease-out text-left w-full
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-[1.02]' 
                  : 'hover:bg-gray-800/50 text-gray-300 hover:text-white hover:scale-[1.01]'
                }
                ${item.highlight && !isActive ? ' border-gray-600' : ''}
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
              )}
              
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>

              {item.highlight && !isActive && (
                <span className="ml-auto flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      {/* <div className="absolute bottom-0 w-full p-4">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-blue-400 mb-1">
            <Sparkles size={14} />
            <p className="text-xs font-semibold">Pro Tip</p>
          </div>
          <p className="text-xs text-gray-300">Use markdown for rich formatting!</p>
        </div>
      </div> */}
    </aside>
  );
}

export default FeedSidebar;