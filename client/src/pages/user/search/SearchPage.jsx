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
  TrendingUp,
  Clock,
  Filter,
  ArrowUpDown,
  Moon,
  Sun,
  Pen,
  BookOpen,
  Users,
  Hash,
  Heart,
  MessageCircle,
  Eye,
  Calendar,
  Tag
} from 'lucide-react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [timeFilter, setTimeFilter] = useState('anytime');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['React Hooks', 'TypeScript', 'Next.js']);
  const [trendingSearches] = useState([
    'React Hooks',
    'TypeScript',
    'Next.js 14',
    'Node.js',
    'Docker',
    'GraphQL',
    'MongoDB',
    'Tailwind CSS'
  ]);
  const searchInputRef = useRef(null);

  const mockBlogs = [
    {
      id: 1,
      title: 'Understanding React Server Components in Next.js 14',
      content: 'A comprehensive guide to React Server Components and how they revolutionize data fetching in modern web applications...',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      likes: 234,
      comments: 45,
      views: '12.5k',
      tags: ['React', 'Next.js', 'JavaScript'],
      author: {
        name: 'Sarah Chen',
        avatar: 'SC',
        role: 'Senior Frontend Developer',
        followers: '15.2k'
      },
      createdAt: '2 days ago'
    },
    {
      id: 2,
      title: 'Building Scalable APIs with Node.js and Express',
      content: 'Learn best practices for creating robust and scalable RESTful APIs using Node.js, Express, and MongoDB...',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
      likes: 189,
      comments: 32,
      views: '8.3k',
      tags: ['Node.js', 'API', 'Backend'],
      author: {
        name: 'Mike Johnson',
        avatar: 'MJ',
        role: 'Backend Engineer',
        followers: '12.8k'
      },
      createdAt: '5 days ago'
    },
    {
      id: 3,
      title: 'Mastering TypeScript: Advanced Types and Patterns',
      content: 'Dive deep into TypeScript advanced features including mapped types, conditional types, and utility types...',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      likes: 312,
      comments: 67,
      views: '18.9k',
      tags: ['TypeScript', 'JavaScript', 'Programming'],
      author: {
        name: 'Emma Wilson',
        avatar: 'EW',
        role: 'Full Stack Developer',
        followers: '20.5k'
      },
      createdAt: '1 week ago'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Results', icon: <Search size={16} /> },
    { value: 'blogs', label: 'Blogs', icon: <BookOpen size={16} /> },
    { value: 'users', label: 'Users', icon: <Users size={16} /> },
    { value: 'tags', label: 'Tags', icon: <Hash size={16} /> }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'views', label: 'Most Viewed' }
  ];

  const timeFilterOptions = [
    { value: 'anytime', label: 'Anytime' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const handleTheme = () => {
    setIsDark(!isDark);
  };

  const performSearch = () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);

    setTimeout(() => {
      const filtered = mockBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filtered);
      setLoading(false);
    }, 800);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  const handleTrendingClick = (term) => {
    setSearchQuery(term);
    setTimeout(() => {
      const filtered = mockBlogs.filter(blog =>
        blog.title.toLowerCase().includes(term.toLowerCase()) ||
        blog.content.toLowerCase().includes(term.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      );
      setSearchResults(filtered);
    }, 100);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        performSearch();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  return (
    <div className={`search-page w-screen min-h-screen ${isDark ? 'bg-[#111826]' : 'bg-[#f4f2ee]'}`}>
      <nav className="w-full h-16 bg-[#1f2936] flex items-center justify-center gap-5 px-4 sticky top-0 z-50">
        <div className="h-full flex justify-center items-center gap-2">
          <div className="h-10 w-10 flex justify-center items-center bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-mono font-bold rounded-md text-sm">
            {'<>'}
          </div>
          <div className="text-white text-xl md:text-2xl font-bold">DevMark</div>
        </div>

        <div className="flex-1 max-w-xl">
          <div
            className={`flex w-full text-gray-400 ${
              searchFocused ? 'border-2 border-blue-600' : 'border border-gray-600'
            } px-3 py-2 rounded-md gap-2 bg-[#111826]`}
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
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
              placeholder="Search by title, tags, author..."
            />
            {searchQuery && (
              <button type="button" onClick={clearSearch}>
                <X size={20} className="text-gray-400 hover:text-white" />
              </button>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-white hover:text-blue-500 cursor-pointer">
            <Home size={20} />
            <span>Home</span>
          </div>
          <div className="flex items-center gap-2 text-white hover:text-blue-500 cursor-pointer">
            <Bookmark size={20} />
            <span className="hidden lg:inline">Bookmarks</span>
          </div>
        </div>

        <div
          onClick={handleTheme}
          className="border border-gray-500 w-8 h-8 flex justify-center items-center rounded-md bg-[#182231] cursor-pointer hover:bg-gray-700"
        >
          {!isDark && <Moon className="text-gray-500" size={20} />}
          {isDark && <Sun className="text-yellow-500" size={20} />}
        </div>

        <div className="hidden md:flex items-center gap-4 relative">
          <div className="w-8 h-8 hover:bg-gray-700 flex justify-center items-center rounded-md relative">
            <Bell className="text-gray-400 cursor-pointer" size={20} />
            <div className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0"></div>
          </div>

          <button className="text-white bg-gradient-to-r from-[#4777f4] to-[#9035ea] px-4 py-2 rounded-md hover:shadow-lg transition-shadow">
            Write Blog
          </button>

          <div
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`flex items-center gap-2 hover:bg-gray-700 ${
              isProfileMenuOpen ? 'bg-gray-700' : ''
            } px-2 py-1 rounded-md cursor-pointer`}
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
            <div className="bg-[#1f2936] cursor-pointer absolute right-0 top-14 text-white w-56 rounded-md flex flex-col gap-2 shadow-xl p-3 border border-gray-700">
              <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-md">
                <User size={18} />
                <span>Profile</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-md">
                <Settings size={18} />
                <span>Settings</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-md border-t border-gray-700 text-red-500">
                <LogOut size={18} />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="w-full min-h-screen flex justify-center items-start gap-5 px-4 py-6">
        <aside className="hidden lg:block w-64 sticky top-24">
          <div className={`${isDark ? 'bg-[#1f2936] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
            <div className="flex items-center gap-2 mb-4">
              <Filter size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Filters</h2>
            </div>

            <div className="mb-6">
              <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                Search In
              </h3>
              <div className="space-y-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setActiveFilter(option.value)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                      activeFilter === option.value
                        ? 'bg-blue-500 text-white'
                        : isDark
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                Time Range
              </h3>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className={`w-full ${isDark ? 'bg-[#111826] border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-md px-3 py-2 text-sm`}
              >
                {timeFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
              <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <Pen size={16} />
                  <span>Write Blog</span>
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <BookOpen size={16} />
                  <span>My Blogs</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 max-w-3xl">
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`w-full flex items-center justify-between ${isDark ? 'bg-[#1f2936] border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} border rounded-lg px-4 py-3`}
            >
              <div className="flex items-center gap-2">
                <Filter size={18} />
                <span className="font-medium">Filters & Sort</span>
              </div>
              <ChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} size={20} />
            </button>
          </div>

          <div className={`${isDark ? 'bg-[#1f2936] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 mb-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <ArrowUpDown size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`${isDark ? 'bg-[#111826] border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-md px-3 py-1.5 text-sm`}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {searchResults.length > 0 && (
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {searchResults.length} results found
                </div>
              )}
            </div>
          </div>

          {!searchQuery ? (
            <div className={`${isDark ? 'bg-[#1f2936] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-8`}>
              {recentSearches.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                      <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Recent Searches
                      </h2>
                    </div>
                    <button
                      onClick={() => setRecentSearches([])}
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTrendingClick(search)}
                        className={`px-4 py-2 ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-full text-sm transition-colors`}
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                  <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Trending Searches
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTrendingClick(search)}
                      className="px-4 py-2 bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white rounded-full text-sm hover:shadow-lg transition-shadow"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((blog) => (
                <div key={blog.id} className={`${isDark ? 'bg-[#1f2936] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden hover:shadow-xl transition-shadow`}>
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 h-48 md:h-auto">
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
                        <button className="ml-auto px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600">
                          Follow
                        </button>
                      </div>
                      <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'} hover:text-blue-500 cursor-pointer`}>
                        {blog.title}
                      </h2>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-3 line-clamp-2`}>
                        {blog.content}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded-full text-xs`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Heart size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{blog.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{blog.comments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{blog.views}</span>
                          </div>
                        </div>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {blog.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`${isDark ? 'bg-[#1f2936] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-12 text-center`}>
              <Search size={48} className={`mx-auto ${isDark ? 'text-gray-600' : 'text-gray-400'} mb-4`} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                No results found
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Try adjusting your search or filters to find what you're looking for
              </p>
              <button
                onClick={clearSearch}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        <aside className="hidden xl:block w-72 sticky top-24">
          <div className={`${isDark ? 'bg-[#1f2936] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
            <div className="flex items-center gap-2 mb-4">
              <Users size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Suggested Developers
              </h2>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Alex Thompson', role: 'React Expert', avatar: 'AT' },
                { name: 'Sarah Martinez', role: 'Backend Dev', avatar: 'SM' },
                { name: 'David Kim', role: 'Full Stack', avatar: 'DK' }
              ].map((dev, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4777f4] to-[#9035ea] flex items-center justify-center text-white font-bold text-sm">
                      {dev.avatar}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {dev.name}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {dev.role}
                      </p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default SearchPage;