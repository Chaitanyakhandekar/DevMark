import React, { useState, useEffect } from 'react';
import { Search, X, Sun, Moon, BookOpen, Users, Heart, MessageCircle, Eye } from 'lucide-react';
import MobileNavBottom from '../../../components/MobileNavBottom';

const SearchPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockBlogs = [
    {
      id: 1,
      title: 'Understanding React Server Components',
      content: 'Learn how React Server Components improve performance and scalability...',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      likes: 234,
      comments: 45,
      views: '12.5k',
      author: 'Sarah Chen',
    },
    {
      id: 2,
      title: 'Mastering TypeScript Basics',
      content: 'A quick introduction to interfaces, generics, and advanced patterns...',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
      likes: 180,
      comments: 22,
      views: '9.2k',
      author: 'Emma Wilson',
    },
  ];

  const mockUsers = [
    { id: 1, name: 'Sarah Chen', role: 'Frontend Developer' },
    { id: 2, name: 'Emma Wilson', role: 'Full Stack Developer' },
    { id: 3, name: 'Mike Johnson', role: 'Backend Engineer' },
  ];

  const performSearch = () => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const blogResults = mockBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const userResults = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults([...blogResults, ...userResults]);
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => performSearch(), 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-[#111826]' : 'bg-gray-100'}`}>
      {/* Navbar */}
      <nav className="w-full h-16 bg-[#1f2936] flex items-center justify-between px-6">
        {/* <div className="text-white font-bold text-xl">DevMark</div> */}
        <div className="flex items-center gap-2 w-full max-w-md bg-[#111826] border border-gray-600 rounded-md px-3 py-2 text-gray-400">
          <Search size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs or users..."
            className="bg-transparent border-none outline-none w-full text-white"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
              <X size={18} className="text-gray-400 hover:text-white" />
            </button>
          )}
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-9 h-9 rounded-md border border-gray-600 flex justify-center items-center bg-[#182231] hover:bg-gray-700"
        >
          {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-400" />}
        </button>
      </nav>

      {/* Search Results */}
      <main className="max-w-3xl mx-auto py-8 px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin h-10 w-10 border-b-2 border-blue-500 rounded-full"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-5">
            {searchResults.map((item) =>
              item.title ? (
                // Blog Result
                <div
                  key={item.id}
                  className={`${isDark ? 'bg-[#1f2936]' : 'bg-white'} border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}
                >
                  <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
                  <div className="p-4">
                    <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} hover:text-blue-500 cursor-pointer`}>
                      {item.title}
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                      {item.content}
                    </p>
                    <div className="flex items-center justify-between text-sm mt-3">
                      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>By {item.author}</p>
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-1"><Heart size={15} />{item.likes}</div>
                        <div className="flex items-center gap-1"><MessageCircle size={15} />{item.comments}</div>
                        <div className="flex items-center gap-1"><Eye size={15} />{item.views}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // User Result
                <div
                  key={item.id}
                  className={`${isDark ? 'bg-[#1f2936]' : 'bg-white'} border border-gray-700 rounded-lg flex justify-between items-center p-4 hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4777f4] to-[#9035ea] flex items-center justify-center text-white font-bold">
                      {item.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.role}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600">Follow</button>
                </div>
              )
            )}
          </div>
        ) : (
          <div className={`text-center mt-20 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <BookOpen size={48} className="mx-auto mb-4 text-blue-500" />
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Search for blogs or developers
            </h2>
            <p className="text-sm">Start typing above to explore content</p>
          </div>
        )}
      </main>

      <MobileNavBottom avatarUrl={""} fixed={true} />


    </div>
  );
};

export default SearchPage;
