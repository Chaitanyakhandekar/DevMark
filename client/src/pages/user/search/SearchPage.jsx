import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Home,
  Bookmark,
  ChevronDown,
  X,
  Moon,
  Sun,
  Heart,
  MessageCircle,
  Eye,
  Users,
  BookOpen,
  ArrowUpDown
} from 'lucide-react';
import MobileNavBottom from '../../../components/MobileNavBottom';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchResults, setSearchResults] = useState({ blogs: [], users: [] });
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);

  const mockBlogs = [
    {
      id: 1,
      title: 'Understanding React Server Components in Next.js 14',
      content: 'A comprehensive guide to React Server Components and how they revolutionize data fetching in modern web applications. Learn about streaming, suspense, and progressive rendering.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      likes: 234,
      comments: 45,
      views: '12.5k',
      tags: ['React', 'Next.js', 'JavaScript'],
      author: {
        name: 'Sarah Chen',
        avatar: 'SC',
        role: 'Senior Frontend Developer'
      },
      createdAt: '2 days ago'
    },
    {
      id: 2,
      title: 'Building Scalable APIs with Node.js and Express',
      content: 'Learn best practices for creating robust and scalable RESTful APIs using Node.js, Express, and MongoDB. Includes authentication, validation, and error handling patterns.',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
      likes: 189,
      comments: 32,
      views: '8.3k',
      tags: ['Node.js', 'API', 'Backend'],
      author: {
        name: 'Mike Johnson',
        avatar: 'MJ',
        role: 'Backend Engineer'
      },
      createdAt: '5 days ago'
    },
    {
      id: 3,
      title: 'Mastering TypeScript: Advanced Types and Patterns',
      content: 'Dive deep into TypeScript advanced features including mapped types, conditional types, and utility types. Build type-safe applications with confidence.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      likes: 312,
      comments: 67,
      views: '18.9k',
      tags: ['TypeScript', 'JavaScript', 'Programming'],
      author: {
        name: 'Emma Wilson',
        avatar: 'EW',
        role: 'Full Stack Developer'
      },
      createdAt: '1 week ago'
    },
    {
      id: 4,
      title: 'Docker Containers: From Basics to Production',
      content: 'Complete guide to containerization with Docker. Learn how to build, deploy, and orchestrate containers in production environments.',
      image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
      likes: 276,
      comments: 54,
      views: '15.2k',
      tags: ['Docker', 'DevOps', 'Containers'],
      author: {
        name: 'David Park',
        avatar: 'DP',
        role: 'DevOps Engineer'
      },
      createdAt: '3 days ago'
    }
  ];

  const mockUsers = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'SC',
      role: 'Senior Frontend Developer',
      bio: 'React enthusiast | Open source contributor | Building modern web apps',
      followers: '15.2k',
      blogs: 42
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avatar: 'MJ',
      role: 'Backend Engineer',
      bio: 'Node.js expert | API architect | Scaling systems at scale',
      followers: '12.8k',
      blogs: 38
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'EW',
      role: 'Full Stack Developer',
      bio: 'TypeScript advocate | Teaching web development | Love clean code',
      followers: '20.5k',
      blogs: 56
    },
    {
      id: 4,
      name: 'David Park',
      avatar: 'DP',
      role: 'DevOps Engineer',
      bio: 'Cloud infrastructure | Kubernetes | CI/CD automation enthusiast',
      followers: '18.3k',
      blogs: 47
    }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const handleTheme = () => {
    setIsDark(!isDark);
  };

  const performSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults({ blogs: [], users: [] });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      
      const filteredBlogs = mockBlogs.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query)) ||
        blog.author.name.toLowerCase().includes(query)
      );

      const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query)
      );

      setSearchResults({ blogs: filteredBlogs, users: filteredUsers });
      setLoading(false);
    }, 600);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults({ blogs: [], users: [] });
  };

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        performSearch();
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setSearchResults({ blogs: [], users: [] });
    }
  }, [searchQuery]);

  const getTotalResults = () => {
    return searchResults.blogs.length + searchResults.users.length;
  };

  const getFilteredResults = () => {
    if (activeTab === 'blogs') return searchResults.blogs;
    if (activeTab === 'users') return searchResults.users;
    return [...searchResults.blogs, ...searchResults.users];
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#111826]' : 'bg-[#f4f2ee]'}`}>
      {/* Navigation */}
      <nav className="w-full h-16 bg-[#1f2936] flex items-center justify-center gap-5 px-4 sticky top-0 z-50 shadow-lg">
        <div className="hidden md:block h-full md:flex justify-center items-center gap-2">
          <div className="h-10 w-10 flex justify-center items-center bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-mono font-bold rounded-md text-sm">
            {'<>'}
          </div>
          <div className="text-white text-xl md:text-2xl font-bold">DevMark</div>
        </div>

        <div className="flex-1 max-w-2xl">
          <div
            className={`flex w-full text-gray-400 ${
              searchFocused ? 'border-2 border-blue-600' : 'border border-gray-600'
            } px-3 py-2 rounded-lg gap-2 bg-[#111826] transition-all`}
          >
            <Search size={20} />
            <input
              ref={searchInputRef}
              className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search blogs, users, topics..."
            />
            {searchQuery && (
              <button type="button" onClick={clearSearch}>
                <X size={20} className="text-gray-400 hover:text-white transition-colors" />
              </button>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-white hover:text-blue-500 cursor-pointer transition-colors">
            <Home size={20} />
            <span>Home</span>
          </div>
          <div className="flex items-center gap-2 text-white hover:text-blue-500 cursor-pointer transition-colors">
            <Bookmark size={20} />
            <span className="hidden lg:inline">Bookmarks</span>
          </div>
        </div>

        <div
          onClick={handleTheme}
          className="hidden md:block border border-gray-500 w-9 h-9 md:flex justify-center items-center rounded-lg bg-[#182231] cursor-pointer hover:bg-gray-700 transition-colors"
        >
          {!isDark && <Moon className="text-gray-500" size={20} />}
          {isDark && <Sun className="text-yellow-500" size={20} />}
        </div>

        <div className="hidden md:flex items-center gap-4 relative">
          <div className="w-9 h-9 hover:bg-gray-700 flex justify-center items-center rounded-lg relative transition-colors cursor-pointer">
            <Bell className="text-gray-400" size={20} />
            <div className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1"></div>
          </div>

          <button className="text-white bg-gradient-to-r from-[#4777f4] to-[#9035ea] px-4 py-2 rounded-lg hover:shadow-lg transition-all font-medium">
            Write Blog
          </button>

          <div
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`flex items-center gap-2 hover:bg-gray-700 ${
              isProfileMenuOpen ? 'bg-gray-700' : ''
            } px-2 py-1 rounded-lg cursor-pointer transition-colors`}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#4777f4] to-[#9035ea] flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <ChevronDown
              className={`text-gray-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
              size={20}
            />
          </div>

          {isProfileMenuOpen && (
            <div className="bg-[#1f2936] absolute right-0 top-14 text-white w-56 rounded-lg flex flex-col gap-1 shadow-2xl p-2 border border-gray-700">
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-md cursor-pointer transition-colors">
                <User size={18} />
                <span>Profile</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-md cursor-pointer transition-colors">
                <Settings size={18} />
                <span>Settings</span>
              </div>
              <div className="border-t border-gray-700 my-1"></div>
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-red-500 hover:bg-opacity-10 rounded-md text-red-400 cursor-pointer transition-colors">
                <LogOut size={18} />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {searchQuery && (
          <>
            {/* Tabs and Sort */}
            <div className={`${isDark ? 'bg-[#1f2936] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 mb-4`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'all'
                        ? 'bg-blue-500 text-white'
                        : isDark
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All ({getTotalResults()})
                  </button>
                  <button
                    onClick={() => setActiveTab('blogs')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeTab === 'blogs'
                        ? 'bg-blue-500 text-white'
                        : isDark
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <BookOpen size={16} />
                    Blogs ({searchResults.blogs.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeTab === 'users'
                        ? 'bg-blue-500 text-white'
                        : isDark
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Users size={16} />
                    Users ({searchResults.users.length})
                  </button>
                </div>

              
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : getTotalResults() > 0 ? (
              <div className="space-y-4">
                {/* Users Results */}
                {(activeTab === 'all' || activeTab === 'users') && searchResults.users.length > 0 && (
                  <>
                    {activeTab === 'all' && (
                      <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                        Users
                      </h2>
                    )}
                    {searchResults.users.map((user) => (
                      <div
                        key={user.id}
                        className={`${isDark ? 'bg-[#1f2936] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-5 hover:shadow-xl transition-shadow cursor-pointer`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#4777f4] to-[#9035ea] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                              {user.avatar}
                            </div>
                            <div>
                              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} hover:text-blue-500`}>
                                {user.name}
                              </h3>
                              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                                {user.role}
                              </p>
                              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                                {user.bio}
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                  {user.followers} followers
                                </span>
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                  {user.blogs} blogs
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors font-medium">
                            Follow
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Blogs Results */}
                {(activeTab === 'all' || activeTab === 'blogs') && searchResults.blogs.length > 0 && (
                  <>
                    {activeTab === 'all' && searchResults.users.length > 0 && (
                      <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 mt-6`}>
                        Blogs
                      </h2>
                    )}
                    {searchResults.blogs.map((blog) => (
                      <div
                        key={blog.id}
                        className={`${isDark ? 'bg-[#1f2936] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer`}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-72 h-48 md:h-auto flex-shrink-0">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-5">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4777f4] to-[#9035ea] flex items-center justify-center text-white font-bold text-sm">
                                {blog.author.avatar}
                              </div>
                              <div>
                                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {blog.author.name}
                                </p>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {blog.author.role}
                                </p>
                              </div>
                              <span className={`ml-auto text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                {blog.createdAt}
                              </span>
                            </div>
                            <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'} hover:text-blue-500`}>
                              {blog.title}
                            </h2>
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>
                              {blog.content}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {blog.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className={`px-3 py-1 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded-full text-xs font-medium`}
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-5 text-sm">
                              <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                                <Heart size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{blog.likes}</span>
                              </div>
                              <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                                <MessageCircle size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{blog.comments}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Eye size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{blog.views}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className={`${isDark ? 'bg-[#1f2936] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-12 text-center`}>
                <Search size={48} className={`mx-auto ${isDark ? 'text-gray-600' : 'text-gray-400'} mb-4`} />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                  No results found
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Try different keywords or check your spelling
                </p>
                <button
                  onClick={clearSearch}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!searchQuery && (
          <div className={`${isDark ? 'bg-[#1f2936] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-16 text-center`}>
            <Search size={64} className={`mx-auto ${isDark ? 'text-gray-600' : 'text-gray-400'} mb-4`} />
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Start searching
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
              Search for blogs, users, and topics across DevMark
            </p>
          </div>
        )}
      </main>

      <MobileNavBottom fixed={true}/>
    </div>
  );
};

export default SearchPage;