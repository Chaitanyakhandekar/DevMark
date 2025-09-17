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
  Star
} from 'lucide-react';

const MainFeed1 = () => {
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  // Mock data - in real app, this would come from API
  const categories = [
    { name: 'All', icon: <Home size={16} />, count: 1247 },
    { name: 'JavaScript', icon: <Code size={16} />, count: 324 },
    { name: 'React', icon: <Zap size={16} />, count: 289 },
    { name: 'Node.js', icon: <Coffee size={16} />, count: 156 },
    { name: 'Career', icon: <Briefcase size={16} />, count: 98 },
    { name: 'Open Source', icon: <Github size={16} />, count: 87 }
  ];

  const trendingTags = [
    '#WebDev', '#AI', '#MachineLearning', '#DevOps', '#CloudComputing',
    '#Debugging', '#Performance', '#Security', '#Mobile', '#Database'
  ];

  const blogPosts = [
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        avatar: "SC",
        verified: true,
        followers: 12500
      },
      title: "Building Scalable React Applications: A Complete Guide",
      description: "Learn how to architect React applications that can grow with your team and user base. We'll cover component patterns, state management, and performance optimization techniques.",
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      tags: ["React", "JavaScript", "Architecture", "Performance"],
      publishedAt: "2h ago",
      readTime: "8 min read",
      stats: {
        views: 2345,
        likes: 187,
        comments: 34
      },
      category: "React"
    },
    {
      id: 2,
      author: {
        name: "Alex Kumar",
        avatar: "AK",
        verified: false,
        followers: 3400
      },
      title: "The Art of Clean Code: Principles Every Developer Should Know",
      description: "Explore the fundamental principles of writing clean, maintainable code that your future self and team members will thank you for.",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      tags: ["CleanCode", "BestPractices", "Programming"],
      publishedAt: "5h ago",
      readTime: "12 min read",
      stats: {
        views: 4567,
        likes: 312,
        comments: 67
      },
      category: "Programming"
    },
    {
      id: 3,
      author: {
        name: "Maria Rodriguez",
        avatar: "MR",
        verified: true,
        followers: 8900
      },
      title: "Mastering Async/Await: From Callbacks to Modern JavaScript",
      description: "A deep dive into asynchronous JavaScript, from callback hell to promises and async/await. Includes real-world examples and common pitfalls.",
      coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
      tags: ["JavaScript", "Async", "Promises", "ES6"],
      publishedAt: "1d ago",
      readTime: "15 min read",
      stats: {
        views: 6789,
        likes: 445,
        comments: 89
      },
      category: "JavaScript"
    }
  ];

  const suggestedDevelopers = [
    { name: "John Smith", role: "Full Stack Dev", followers: "15.2k", avatar: "JS" },
    { name: "Emma Wilson", role: "React Expert", followers: "22.1k", avatar: "EW" },
    { name: "David Park", role: "DevOps Engineer", followers: "18.7k", avatar: "DP" }
  ];

  const trendingBlogs = [
    { title: "10 VS Code Extensions Every Developer Needs", views: "45.2k", author: "Tech Insider" },
    { title: "Why TypeScript is Taking Over JavaScript", views: "38.7k", author: "Code Masters" },
    { title: "Building Your First Docker Container", views: "29.3k", author: "DevOps Daily" }
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const handleSave = (postId) => {
    setSavedPosts(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(postId)) {
        newSaved.delete(postId);
      } else {
        newSaved.add(postId);
      }
      return newSaved;
    });
  };

  const BlogCard = ({ post }) => (
    <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {post.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {post.readTime}
          </div>
        </div>
      )}
      
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full flex items-center justify-center text-white font-semibold">
            {post.author.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 dark:text-white">{post.author.name}</span>
              {post.author.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{post.publishedAt}</span>
              <span>•</span>
              <span>{post.author.followers.toLocaleString()} followers</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-[#4777f4] cursor-pointer transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLike(post.id)}
              className={`flex items-center gap-2 transition-colors ${
                likedPosts.has(post.id) 
                  ? 'text-red-500' 
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart size={18} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
              <span className="text-sm">{post.stats.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle size={18} />
              <span className="text-sm">{post.stats.comments}</span>
            </button>

            <button
              onClick={() => handleSave(post.id)}
              className={`flex items-center gap-2 transition-colors ${
                savedPosts.has(post.id) 
                  ? 'text-yellow-500' 
                  : 'text-gray-500 hover:text-yellow-500'
              }`}
            >
              <Bookmark size={18} fill={savedPosts.has(post.id) ? 'currentColor' : 'none'} />
            </button>

            <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
              <Share2 size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Eye size={16} />
            <span className="text-sm">{post.stats.views.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-[#111827]' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className="bg-white dark:bg-[#1f2937] border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-md flex items-center justify-center text-white font-mono font-bold">
                  {'<>'}
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">DevMark</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by title, tags, or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4777f4] focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Navigation Links & Actions */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                <a href="#" className="hover:text-[#4777f4] transition-colors flex items-center gap-1">
                  <Home size={18} />
                  <span>Home</span>
                </a>
                <a href="#" className="hover:text-[#4777f4] transition-colors">Categories</a>
                <a href="#" className="hover:text-[#4777f4] transition-colors flex items-center gap-1">
                  <Edit3 size={18} />
                  <span>Write</span>
                </a>
                <a href="#" className="hover:text-[#4777f4] transition-colors flex items-center gap-1">
                  <Bookmark size={18} />
                  <span>Bookmarks</span>
                </a>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-gray-600" />}
                </button>

                <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative">
                  <Bell size={18} className="text-gray-600 dark:text-gray-300" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                <button className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform font-medium">
                  Write Blog
                </button>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      JD
                    </div>
                    <ChevronDown size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <User size={16} />
                        Profile
                      </a>
                      <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <Settings size={16} />
                        Settings
                      </a>
                      <hr className="my-1 border-gray-200 dark:border-gray-600" />
                      <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600">
                        <LogOut size={16} />
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4777f4] text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex gap-8 px-4 sm:px-6 lg:px-8 py-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-64 space-y-6">
          {/* Categories */}
          <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Filter size={18} />
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-[#4777f4] text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                  <span className="text-sm opacity-70">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} />
              Trending Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-[#4777f4] hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-700 dark:text-gray-300">
                <Edit3 size={16} />
                Write Blog
              </button>
              <button className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-700 dark:text-gray-300">
                <BookOpen size={16} />
                My Blogs
              </button>
              <button className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-700 dark:text-gray-300">
                <Bookmark size={16} />
                Saved Blogs
              </button>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 space-y-6">
          {/* Filter Bar */}
          <div className="bg-white dark:bg-[#1f2937] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4777f4]"
                >
                  <option value="Latest">Latest</option>
                  <option value="Trending">Trending</option>
                  <option value="Most Liked">Most Liked</option>
                  <option value="Most Viewed">Most Viewed</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={16} />
                <span>Last updated: 2 minutes ago</span>
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center py-8">
            <button className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform font-medium">
              Load More Posts
            </button>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-80 space-y-6">
          {/* Trending Blogs */}
          <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} />
              Trending This Week
            </h3>
            <div className="space-y-4">
              {trendingBlogs.map((blog, index) => (
                <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                      {blog.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Eye size={12} />
                      <span>{blog.views}</span>
                      <span>•</span>
                      <span>{blog.author}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Developers */}
          <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users size={18} />
              Suggested Developers
            </h3>
            <div className="space-y-4">
              {suggestedDevelopers.map((dev, index) => (
                <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full flex items-center justify-center text-white font-semibold">
                    {dev.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{dev.name}</h4>
                    <p className="text-xs text-gray-500">{dev.role}</p>
                    <p className="text-xs text-gray-400">{dev.followers} followers</p>
                  </div>
                  <button className="px-3 py-1 bg-[#4777f4] text-white rounded-lg text-sm hover:bg-[#3d6ce8] transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Events */}
          <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar size={18} />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">React Conf 2025</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">March 15-16, Virtual</p>
                <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  Learn More →
                </button>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Open Source Summit</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">April 2-4, San Francisco</p>
                <button className="text-xs text-green-600 dark:text-green-400 font-medium hover:underline">
                  Learn More →
                </button>
              </div>

              <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">AI & Dev Summit</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">May 10-12, Online</p>
                <button className="text-xs text-purple-600 dark:text-purple-400 font-medium hover:underline">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#1f2937] border-t border-gray-200 dark:border-gray-700 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} DevMark. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-[#4777f4]">Privacy Policy</a>
            <a href="#" className="hover:text-[#4777f4]">Terms of Service</a>
            <a href="#" className="hover:text-[#4777f4] flex items-center gap-1">
              <Github size={14} /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainFeed1;
