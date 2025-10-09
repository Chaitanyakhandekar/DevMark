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

function ProfilePage() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState("grid");
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data
  const userData = {
    name: "byte_coder",
    username: "@byte_coder",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=byte_coder",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop",
    bio: "Full Stack Developer | Open Source Enthusiast | Building scalable web applications with React, Node.js, and TypeScript",
    location: "San Francisco, CA",
    website: "bytecoder.dev",
    joinedDate: "Joined March 2023",
    followers: 2847,
    following: 432,
    totalPosts: 127,
    totalLikes: 15234,
    totalViews: 453621,
    isVerified: true,
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Docker", "AWS"],
    socialLinks: {
      github: "byte_coder",
      twitter: "byte_coder",
      linkedin: "byte-coder"
    }
  };

  const userPosts = [
    {
      id: 1,
      title: "Why Every JavaScript Developer Should Learn TypeScript in 2025",
      thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
      excerpt: "TypeScript isn't just a trend anymore — it's the industry standard for writing scalable and maintainable JavaScript applications...",
      likes: 847,
      comments: 92,
      views: 12453,
      tags: ["#typescript", "#javascript", "#webdev"],
      readTime: "8 min read",
      publishedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Building Scalable REST APIs with Node.js and Express",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      excerpt: "Learn how to build production-ready REST APIs with proper architecture, authentication, and error handling...",
      likes: 1234,
      comments: 156,
      views: 23891,
      tags: ["#nodejs", "#express", "#backend"],
      readTime: "12 min read",
      publishedDate: "5 days ago"
    },
    {
      id: 3,
      title: "React Performance Optimization: Best Practices",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      excerpt: "Discover advanced techniques to optimize your React applications for better performance and user experience...",
      likes: 2156,
      comments: 203,
      views: 34567,
      tags: ["#react", "#performance", "#optimization"],
      readTime: "10 min read",
      publishedDate: "1 week ago"
    },
    {
      id: 4,
      title: "Understanding Docker Containers for Beginners",
      thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop",
      excerpt: "A comprehensive guide to containerization with Docker, from basics to deployment strategies...",
      likes: 956,
      comments: 87,
      views: 18234,
      tags: ["#docker", "#devops", "#containers"],
      readTime: "15 min read",
      publishedDate: "2 weeks ago"
    }
  ];

  const stats = [
    { label: "Posts", value: userData.totalPosts, icon: <BookOpen size={20} /> },
    { label: "Followers", value: userData.followers.toLocaleString(), icon: <Users size={20} /> },
    { label: "Following", value: userData.following.toLocaleString(), icon: <Users size={20} /> },
    { label: "Total Likes", value: userData.totalLikes.toLocaleString(), icon: <Heart size={20} /> },
    { label: "Total Views", value: userData.totalViews.toLocaleString(), icon: <Eye size={20} /> }
  ];

  const handleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      setIsDark(false);
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      setIsDark(true);
      html.classList.remove("light");
      html.classList.add("dark");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f2ee] dark:bg-[#111826]">
      
      {/* Navbar */}
      <nav className="w-full h-[4rem] bg-[#1f2936] flex items-center justify-center gap-5 px-5 sticky top-0 z-50">
        
        <div className="h-full flex justify-center items-center gap-2">
          <div className="h-10 w-10 flex justify-center items-center bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-mono font-bold rounded-md">
            {'<>'}
          </div>
          <div className="text-white text-2xl font-bold">
            DevMark
          </div>
        </div>

        <div className={`flex w-[25%] text-gray-400 ${searchFocused ? "border-2 border-blue-600" : "border-[0.2px] border-gray-600"} px-3 py-2 rounded-md gap-2`}>
          <Search />
          <input
            className='bg-transparent border-none outline-none w-full'
            type="text"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder='search by title, tags, author...'
          />
        </div>

        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2 text-white hover:text-blue-500 cursor-pointer'>
            <Home size={20} />
            Home
          </div>
          <h1 className='text-white hover:text-blue-500 cursor-pointer'>Categories</h1>
          <div className="flex items-center gap-2 text-white hover:text-blue-500 cursor-pointer">
            <Edit3 size={20} />
            Write
          </div>
          <div className="flex items-center gap-2 text-white hover:text-blue-500 cursor-pointer">
            <Bookmark size={20} />
            Bookmarks
          </div>
        </div>

        <div
          onClick={handleTheme}
          className="border-[1.2px] border-gray-500 w-8 h-8 flex justify-center items-center rounded-md bg-[#182231] cursor-pointer"
        >
          {!isDark && <Moon className="text-gray-500" size={20} />}
          {isDark && <Sun className="text-yellow-500" size={20} />}
        </div>

        <div className="flex items-center gap-5 relative">
          <div className="w-7 h-7 hover:bg-gray-700 flex justify-center items-center rounded-md relative">
            <Bell className='text-gray-400 cursor-pointer' size={20} />
            <div className='w-3 h-3 rounded-full bg-red-500 absolute top-[-0.4rem] right-[-0.5rem]'></div>
          </div>

          <button className="text-white bg-gradient-to-r from-[#4777f4] to-[#9035ea] px-4 py-2 rounded-md">
            Write Blog
          </button>

          <div
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`flex items-center gap-2 hover:bg-gray-700 ${isProfileMenuOpen ? "bg-gray-700" : ""} px-2 py-1 rounded-md cursor-pointer`}
          >
            <img className='w-9 h-9 rounded-full object-cover' src={userData.avatar} alt="Profile" />
            <ChevronDown className='text-gray-400' size={20} />
          </div>

          {isProfileMenuOpen && (
            <div className="bg-[#1f2936] absolute right-0 top-12 text-white w-60 rounded-md flex flex-col gap-3 shadow-lg p-3">
              <div className='flex items-center gap-2 cursor-pointer hover:text-blue-500'>
                <User size={20} />
                <h1>Profile</h1>
              </div>
              <div className='flex items-center gap-2 cursor-pointer hover:text-blue-500'>
                <Settings size={20} />
                <h1>Settings</h1>
              </div>
              <div className='flex items-center gap-2 border-t border-gray-600 pt-2 cursor-pointer hover:text-red-400'>
                <LogOut className='text-red-500' size={20} />
                <button className='text-red-500'>Logout</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className='w-full max-w-7xl mx-auto px-4 py-6'>
        
        {/* Cover Image */}
        <div className='relative w-full h-64 rounded-lg overflow-hidden mb-6'>
          <img 
            src={userData.coverImage} 
            alt="Cover" 
            className='w-full h-full object-cover'
          />
          <button className='absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-md flex items-center gap-2'>
            <Edit size={16} />
            Edit Cover
          </button>
        </div>

        {/* Profile Header */}
        <div className='bg-white dark:bg-[#1f2936] rounded-lg p-6 mb-6 shadow-lg'>
          <div className='flex flex-col md:flex-row gap-6'>
            
            {/* Avatar and Basic Info */}
            <div className='flex flex-col items-center md:items-start gap-4'>
              <div className='relative'>
                <img 
                  src={userData.avatar} 
                  alt={userData.name}
                  className='w-32 h-32 rounded-full border-4 border-white dark:border-[#1f2936] object-cover shadow-xl'
                />
                <button className='absolute bottom-0 right-0 bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white p-2 rounded-full'>
                  <Edit size={16} />
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className='flex-1'>
              <div className='flex flex-col md:flex-row justify-between items-start gap-4 mb-4'>
                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>{userData.name}</h1>
                    {userData.isVerified && (
                      <div className='bg-blue-500 rounded-full p-1'>
                        <Star size={16} className='text-white fill-white' />
                      </div>
                    )}
                  </div>
                  <p className='text-gray-500 dark:text-gray-400 mb-3'>{userData.username}</p>
                  <p className='text-gray-700 dark:text-gray-300 max-w-2xl mb-4'>{userData.bio}</p>
                  
                  {/* Meta Info */}
                  <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4'>
                    <div className='flex items-center gap-1'>
                      <MapPin size={16} />
                      <span>{userData.location}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <LinkIcon size={16} />
                      <a href={`https://${userData.website}`} className='text-blue-500 hover:underline'>
                        {userData.website}
                      </a>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Calendar size={16} />
                      <span>{userData.joinedDate}</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className='flex items-center gap-3'>
                    <a href={`https://github.com/${userData.socialLinks.github}`} 
                       className='text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors'>
                      <FaGithub size={20} />
                    </a>
                    <a href={`https://twitter.com/${userData.socialLinks.twitter}`}
                       className='text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors'>
                      <FaTwitter size={20} />
                    </a>
                    <a href={`https://linkedin.com/in/${userData.socialLinks.linkedin}`}
                       className='text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors'>
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col gap-2'>
                  <button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      isFollowing 
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600' 
                        : 'bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <button className='px-6 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                    Message
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div className='mb-4'>
                <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>Skills</h3>
                <div className='flex flex-wrap gap-2'>
                  {userData.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className='px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='flex items-center justify-center gap-2 mb-1'>
                  <span className='text-gray-500 dark:text-gray-400'>{stat.icon}</span>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white'>{stat.value}</p>
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs and Content */}
        <div className='bg-white dark:bg-[#1f2936] rounded-lg shadow-lg'>
          
          {/* Tab Navigation */}
          <div className='flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6'>
            <div className='flex items-center gap-6'>
              <button
                onClick={() => setActiveTab("posts")}
                className={`py-4 px-2 font-medium transition-colors relative ${
                  activeTab === "posts" 
                    ? "text-blue-500" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Posts ({userData.totalPosts})
                {activeTab === "posts" && (
                  <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500'></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`py-4 px-2 font-medium transition-colors relative ${
                  activeTab === "about" 
                    ? "text-blue-500" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                About
                {activeTab === "about" && (
                  <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500'></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`py-4 px-2 font-medium transition-colors relative ${
                  activeTab === "activity" 
                    ? "text-blue-500" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Activity
                {activeTab === "activity" && (
                  <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500'></div>
                )}
              </button>
            </div>

            {activeTab === "posts" && (
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${viewMode === "grid" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-500" : "text-gray-600 dark:text-gray-400"}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md ${viewMode === "list" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-500" : "text-gray-600 dark:text-gray-400"}`}
                >
                  <List size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Tab Content */}
          <div className='p-6'>
            
            {/* Posts Tab */}
            {activeTab === "posts" && (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-4"}>
                {userPosts.map((post) => (
                  <div 
                    key={post.id}
                    className='bg-gray-50 dark:bg-[#182231] rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700'
                  >
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      className='w-full h-48 object-cover'
                    />
                    <div className='p-4'>
                      <div className='flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2'>
                        <span>{post.publishedDate}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2'>
                        {post.title}
                      </h3>
                      <p className='text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2'>
                        {post.excerpt}
                      </p>
                      <div className='flex flex-wrap gap-2 mb-3'>
                        {post.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className='text-xs text-blue-600 dark:text-blue-400'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-400'>
                        <div className='flex items-center gap-4'>
                          <span className='flex items-center gap-1'>
                            <Heart size={16} />
                            {post.likes}
                          </span>
                          <span className='flex items-center gap-1'>
                            <MessageCircle size={16} />
                            {post.comments}
                          </span>
                          <span className='flex items-center gap-1'>
                            <Eye size={16} />
                            {post.views}
                          </span>
                        </div>
                        <button className='text-gray-600 dark:text-gray-400 hover:text-blue-500'>
                          <MoreHorizontal size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <div className='space-y-6'>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>About Me</h3>
                  <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                    {userData.bio}
                  </p>
                </div>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>Experience</h3>
                  <div className='space-y-4'>
                    <div className='flex gap-4'>
                      <div className='w-12 h-12 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-lg flex items-center justify-center text-white font-bold'>
                        D
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-semibold text-gray-900 dark:text-white'>Senior Full Stack Developer</h4>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>DevCorp Inc. • 2022 - Present</p>
                        <p className='text-sm text-gray-700 dark:text-gray-300 mt-2'>
                          Leading development of scalable web applications using React and Node.js
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className='space-y-4'>
                <div className='flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700'>
                  <Activity size={20} className='text-blue-500 mt-1' />
                  <div className='flex-1'>
                    <p className='text-gray-900 dark:text-white'>
                      <span className='font-semibold'>Published a new post</span>
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>2 days ago</p>
                  </div>
                </div>
                <div className='flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700'>
                  <Heart size={20} className='text-red-500 mt-1' />
                  <div className='flex-1'>
                    <p className='text-gray-900 dark:text-white'>
                      <span className='font-semibold'>Received 50 likes on "TypeScript Guide"</span>
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>3 days ago</p>
                  </div>
                </div>
                <div className='flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700'>
                  <Users size={20} className='text-green-500 mt-1' />
                  <div className='flex-1'>
                    <p className='text-gray-900 dark:text-white'>
                      <span className='font-semibold'>Gained 100 new followers</span>
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>1 week ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;