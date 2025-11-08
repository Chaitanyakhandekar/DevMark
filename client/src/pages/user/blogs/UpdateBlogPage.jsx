import React, { use, useEffect, useState } from 'react'
import axios from "axios"
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
  Plus,
  Type,
  FileText,
  Loader,
  Sparkles,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import MDEditor from "@uiw/react-md-editor"
import rehypeHighlights from "rehype-highlight"
import Swal from 'sweetalert2'
import { blogApi } from '../../../api/blog.api';
import { useParams } from 'react-router-dom';
import FeedSidebar from '../../../components/FeedSidebar';

function UpdateBlogPage() {
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [userAvatar, setUserAvatar] = useState("https://res.cloudinary.com/dzgtlxfhv/image/upload/v1759152185/dfwvfrdrczaf96nfnar8.png")
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [blogId, setBlogId] = useState(useParams().id)

    const [blogData, setBlogData] = useState({
        content: "Hey there! Start writing your blog content here...",
        title: "",
        status: "published",
        category: "Full Stack",
        tags: "",
        words: 0,
        images: [],
        characters: 0,
        readingTime: 0
    })

    const handleBlogDataChange = (e) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value
        })
    }

    const clearData = () => {
        setBlogData({
            content: "",
            title: "",
            status: "published",
            category: "Full Stack",
            tags: "",
            words: 0,
            images: [],
            characters: 0,
            readingTime: 0
        })
    }

    const fetchUserAvatar = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/users/avatar`, {
                withCredentials: true
            })
            setUserAvatar(res.data.avatar)
        } catch (error) {
            console.log("Error :: Fetching User Avatar :: ", error.message)
        }
    }

    const publishBlog = async () => {
        setLoading(true)
        try {
            const tagsArray = blogData.tags
                ? blogData.tags.split("#").map(tag => tag.trim()).filter(Boolean)
                : [];

            let imgs = new Array();
            imgs = blogData.images

            const formData = new FormData();

            formData.append("title", blogData.title || "Untitled Blog Post");
            formData.append("content", blogData.content);
            formData.append("category", blogData.category);
            formData.append("status", blogData.status);
            tagsArray.forEach(tag => formData.append("tags[]", tag));
            imgs.forEach(img => formData.append("images", img));

            const res = await axios.post(`${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/blogs/create`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Blog Published',
                    text: 'Your blog has been published successfully!',
                    background: '#1f2936',
                    color: '#c9d1d9',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
                clearData();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Blog Not Published',
                    text: 'There was an error publishing your blog.',
                    background: '#1f2936',
                    color: '#c9d1d9'
                });
            }
        } catch (error) {
            setError(error.message)
            console.log("PublishedBlog :: Error :: ", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchBlogData = async ()=>{
        const res = await blogApi.getBlogById(blogId)
        if(res.success){
            const blog = res.data
            setBlogData({
                content: blog.content,
                title: blog.title,
                status: blog.status,
                category: blog.category,
                tags: blog.tags.join("#") || "",
                words: blog.words || 0,
                images: blog.images || [],
                characters: blog.characters || 0,
                readingTime: blog.readingTime || 0
            })
        }
    }

    useEffect(() => {
        let content = blogData.content;
        let words = content.split(" ")
        let characters = 0;

        words = words.filter((word) => word.trim() !== "")
        words.forEach((word) => {
            characters += word.length
        })

        const readingTimeCalc = Math.ceil(words.length / 200);

        setBlogData({
            ...blogData,
            words: words.length,
            characters: characters,
            readingTime: readingTimeCalc > 0 ? readingTimeCalc : 1
        })
    }, [blogData.content])

    useEffect(() => {
        fetchBlogData()
        fetchUserAvatar()
        const html = document.documentElement
        html.classList.add("dark")

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    const categories = [
        'Frontend Development',
        'Backend Development',
        'Full Stack',
        'Mobile Development',
        'DevOps',
        'Data Science',
        'Machine Learning',
        'Cybersecurity',
        'Web3/Blockchain',
        'Career & Growth',
        'Tutorials',
        'Opinion & Discussion'
    ];

    const menuItems = [
        { id: "all", icon: "📚", label: "All Blogs", route: "/user/feed" },
        { id: "search", icon: "🔍", label: "Search", route: "/user/search" },
        { id: "create", icon: "✍️", label: "Write Blog", route: "/user/blogs/create", highlight: true },
        { id: "my-blogs", icon: "📖", label: "My Blogs", route: "/user/blogs" },
        { id: "saved", icon: "🔖", label: "Saved Blogs", route: "/user/saved-blogs" },
        { id: "profile", icon: "👤", label: "Profile", route: "/user/profile" }
    ];

    const navigate = (route) => {
        window.location.href = route;
    };

    return (
        <div className="min-w-screen min-h-screen dark:bg-[#0f1419] relative">
            {/* Enhanced Sidebar */}
            <FeedSidebar activePage='update' />

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="md:ml-64 min-h-screen">
                {/* Enhanced Navbar */}
                <nav className='sticky top-0 z-30 w-full bg-[#1f2936]/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg'>
                    <div className='h-16 px-4 md:px-8 flex justify-between items-center'>
                        {/* Left Section */}
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setSidebarOpen(true)}
                                className="md:hidden text-white hover:bg-gray-700 p-2 rounded-lg transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            
                            <div className="hidden md:flex items-center gap-2 text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg">
                                <Clock size={16} />
                                <p className="text-sm">{blogData.words} words · {blogData.readingTime} min read</p>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={()=>navigate("/user/feed")} 
                                title="Discard Changes"
                                className='hidden md:flex items-center gap-2 text-sm px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
                            >
                                Cancel
                            </button>
                            
                            <button
                                onClick={publishBlog}
                                disabled={blogData.content.trim().length === 0 || blogData.title.trim().length === 0 || !blogData.images.length || loading}
                                title={blogData.content.trim().length === 0 || blogData.title.trim().length === 0 || !blogData.images.length ? "Title, content and image required" : "Publish Blog"}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                {loading ? (
                                    <Loader size={16} className="animate-spin" />
                                ) : (
                                    <>
                                        <TrendingUp size={16} />
                                        <span className="hidden sm:inline">Update</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Content Area */}
                <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 lg:p-8">
                    {/* Editor Section */}
                    <div className="flex-1 max-w-4xl mx-auto lg:mx-0 w-full">
                        <div className="space-y-4">
                            {/* Title Input */}
                            <div className="bg-[#1f2936] border border-gray-700/50 rounded-xl p-4 shadow-lg hover:border-blue-500/50 transition-colors">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Type className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={blogData.title}
                                        onChange={handleBlogDataChange}
                                        placeholder="Enter your blog title..."
                                        className="w-full pl-10 pr-4 py-3 text-xl font-bold bg-transparent text-white placeholder-gray-500 focus:outline-none"
                                        maxLength={200}
                                    />
                                </div>
                                <div className="mt-2 flex justify-between items-center text-xs">
                                    <span className="text-gray-400">Make it catchy and descriptive</span>
                                    <span className={`${blogData.title.length > 180 ? 'text-orange-400' : 'text-gray-400'}`}>
                                        {blogData.title.length}/200
                                    </span>
                                </div>
                            </div>

                            {/* Markdown Editor */}
                            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
                                <MDEditor
                                    value={blogData.content}
                                    onChange={(value) => setBlogData({ ...blogData, content: value || "" })}
                                    preview="edit"
                                    height={680}
                                    className='dark:bg-[#1f2936]'
                                    data-color-mode="dark"
                                    previewOptions={{
                                        rehypePlugins: [[rehypeHighlights, { detect: true }]]
                                    }}
                                    textareaProps={{
                                        placeholder: '✨ Start writing your amazing content here...\n\n💡 Pro tips:\n• Use **bold** and *italic* for emphasis\n• Add code with `backticks`\n• Create headers with # ## ###\n• Insert links [text](url)\n• Add images ![alt](url)',
                                        className: 'dark:bg-[#1f2936] dark:text-white',
                                        style: {
                                            fontSize: '15px',
                                            lineHeight: '1.7',
                                            fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace'
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Settings */}
                    <aside className="w-full lg:w-80 space-y-4">
                        {/* Publish Settings Card */}
                        <div className="bg-[#1f2936] border border-gray-700/50 rounded-xl p-5 shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Settings size={18} className="text-blue-400" />
                                </div>
                                <h2 className="text-white font-bold">Publish Settings</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                                        <Globe size={14} />
                                        Status
                                    </label>
                                    <select 
                                        value={blogData.status} 
                                        onChange={(e) => setBlogData({ ...blogData, status: e.target.value })} 
                                        className='w-full bg-gray-800/50 border border-gray-600 text-white outline-none p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all'
                                    >
                                        <option value="draft">📝 Draft</option>
                                        <option value="published">🌍 Published</option>
                                        <option value="private">🔒 Private</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                                        <Tag size={14} />
                                        Category
                                    </label>
                                    <select
                                        value={blogData.category} 
                                        onChange={(e) => setBlogData({ ...blogData, category: e.target.value })}
                                        className='w-full bg-gray-800/50 border border-gray-600 text-white outline-none p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all'
                                    >
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Tags & Images Card */}
                        <div className="bg-[#1f2936] border border-gray-700/50 rounded-xl p-5 shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-green-500/20 rounded-lg">
                                    <Tag size={18} className="text-green-400" />
                                </div>
                                <h2 className="text-white font-bold">Tags & Media</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-300 mb-2 block">Tags</label>
                                    <textarea
                                        className='w-full bg-gray-800/50 text-white border border-gray-600 outline-none p-3 rounded-lg resize-none focus:ring-2 focus:ring-green-500 transition-all'
                                        placeholder='#react #javascript #webdev'
                                        name="tags"
                                        value={blogData.tags}
                                        onChange={handleBlogDataChange}
                                        rows={3}
                                    />
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                                        <Image size={14} />
                                        Upload Images
                                    </label>
                                    <div className="relative">
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => {
                                                setBlogData((prev) => ({
                                                    ...prev,
                                                    images: [...prev.images, ...Array.from(e.target.files)]
                                                }))
                                            }}
                                            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer transition-all"
                                        />
                                    </div>
                                    {blogData.images.length > 0 && (
                                        <div className="mt-2 flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-2 rounded-lg">
                                            <CheckCircle2 size={14} />
                                            {blogData.images.length} image(s) selected
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Statistics Card */}
                        <div className="bg-[#1f2936] border border-gray-700/50 rounded-xl p-5 shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <FileText size={18} className="text-purple-400" />
                                </div>
                                <h2 className="text-white font-bold">Statistics</h2>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 p-3 rounded-lg">
                                    <p className='text-xs text-gray-400 mb-1'>Words</p>
                                    <p className='text-xl font-bold text-white'>{blogData.words}</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 p-3 rounded-lg">
                                    <p className='text-xs text-gray-400 mb-1'>Characters</p>
                                    <p className='text-xl font-bold text-white'>{blogData.characters}</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 p-3 rounded-lg">
                                    <p className='text-xs text-gray-400 mb-1'>Read Time</p>
                                    <p className='text-xl font-bold text-white'>{blogData.readingTime} min</p>
                                </div>

                                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 p-3 rounded-lg">
                                    <p className='text-xs text-gray-400 mb-1'>Title</p>
                                    <p className='text-xl font-bold text-white'>{blogData.title.length}</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default UpdateBlogPage;