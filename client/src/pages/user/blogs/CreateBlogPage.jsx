import React, { useEffect, useState } from 'react'
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
    CheckCircle2,
    Trash2,
    ZoomIn
} from 'lucide-react';
import MDEditor from "@uiw/react-md-editor"
import rehypeHighlights from "rehype-highlight"
import Swal from 'sweetalert2'
import MobileNavBottom from '../../../components/MobileNavBottom';
import { draftApi } from '../../../api/draft.api';

function CreateBlogPage() {
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [userAvatar, setUserAvatar] = useState("https://res.cloudinary.com/dzgtlxfhv/image/upload/v1759152185/dfwvfrdrczaf96nfnar8.png")
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [imagePreviewModal, setImagePreviewModal] = useState(null)

    const [blogData, setBlogData] = useState({
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

        if(blogData.images.length === 0){
            Swal.fire({
                icon: 'error',
                title: 'No Images Uploaded',
                text: 'Please upload at least one image for your blog post.',
                background: '#1f2936',
                color: '#c9d1d9'
            });
            return;
        }

        if(blogData.images.length > 5){
            Swal.fire({
                icon: 'error',
                title: 'Too Many Images',
                text: 'You can upload a maximum of 5 images per blog post.',
                background: '#1f2936',
                color: '#c9d1d9'
            });
            return;
        }



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

    const removeImage = (indexToRemove) => {
        setBlogData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }))
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

    const handleDraft = async () => {
        setLoading(true)
        console.log("Client Images ::::::::::::::::::::::::::::: ",blogData.images )
        const res = await draftApi.createDraft(blogData, blogData.images)

        if (res.success) {
            Swal.fire({
                icon: 'success',
                title: 'Blog Saved As Draft',
                text: 'Your blog has been saved as a draft successfully!',
                background: '#1f2936',
                color: '#c9d1d9',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Draft Not Saved',
                text: 'There was an error saving your draft.',
                background: '#1f2936',
                color: '#c9d1d9'
            });
        }
        clearData();
        setLoading(false)
    }

    return (
        <div className="min-w-screen min-h-screen dark:bg-[#0f1419] relative">
            {/* Enhanced Sidebar */}
            <aside className={`
                hidden md:block
                fixed top-0 left-0 h-screen w-64 z-50 
                bg-gradient-to-b from-[#1f2936] to-[#161d28]
                border-r border-gray-700/50
                transform transition-transform duration-300 ease-in-out
                md:translate-x-0
                shadow-2xl
            `}>
                {/* Sidebar Header */}
                <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 px-5 py-6">
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
                        const isActive = "create" === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.route)}
                                className={`
                                    group relative flex items-center gap-3 px-4 py-3 rounded-lg
                                    transition-all duration-300 ease-out text-left w-full
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-[1.02]'
                                        : 'hover:bg-gray-800/50 text-gray-300 hover:text-white hover:scale-[1.01]'
                                    }
                                    ${item.highlight && !isActive ? 'border border-dashed border-gray-600' : ''}
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
            </aside>

            {/* Main Content */}
            <div className="md:ml-64 min-h-screen">
                {/* Enhanced Navbar */}
                <nav className='sticky top-0 z-30 w-full bg-[#1f2936]/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg'>
                    <div className='h-16 px-4 md:px-8 flex justify-between items-center'>
                        {/* Left Section */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg">
                                {/* <Clock size={16} />
                                <p className="text-sm">{blogData.words} words · {blogData.readingTime} min read</p> */}
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex justify-around md:justify-around w-full md:w-auto items-center gap-3">

                            <button
                                onClick={handleDraft}
                                disabled={blogData.content.trim().length === 0 && blogData.title.trim().length === 0 && !blogData.images.length}
                                title={blogData.content.trim().length === 0 && blogData.title.trim().length === 0 && !blogData.images.length ? "Cannot Save Empty Blog As A Draft." : "Save Blog as Draft"}
                                className=' flex items-center gap-2 text-sm px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
                            >

                                {loading ? (
                                    <Loader size={16} className="animate-spin" />
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Save Draft
                                    </>
                                )}

                            </button>

                            <button
                                onClick={publishBlog}
                                disabled={blogData.content.trim().length === 0 || blogData.title.trim().length === 0 || loading}
                                title={blogData.content.trim().length === 0 || blogData.title.trim().length === 0 ||  "Publish Blog"}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                {loading ? (
                                    <Loader size={16} className="animate-spin" />
                                ) : (
                                    <>
                                        <TrendingUp size={16} />
                                        <span className=" sm:inline">Publish</span>
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
                        {/* Category Card */}
                        <div className="bg-[#1f2936] border border-gray-700/50 rounded-xl p-5 shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Tag size={18} className="text-blue-400" />
                                </div>
                                <h2 className="text-white font-bold">Category</h2>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Select blog category</label>
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

                        {/* Image Upload & Preview Card */}
                        <div className="bg-[#1f2936] border border-gray-700/50 rounded-xl p-5 shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Image size={18} className="text-purple-400" />
                                </div>
                                <h2 className="text-white font-bold">Media Gallery</h2>
                            </div>

                            <div className="space-y-4">
                                {/* Upload Button */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="image-upload"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                            setBlogData((prev) => ({
                                                ...prev,
                                                images: [...prev.images, ...Array.from(e.target.files)]
                                            }))
                                        }}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <Plus size={18} />
                                        <span>Upload Images</span>
                                    </label>
                                </div>

                                {/* Image Count Badge */}
                                {blogData.images.length > 0 && (
                                    <div className="flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg px-4 py-2">
                                        <div className="flex items-center gap-2 text-purple-400">
                                            <CheckCircle2 size={16} />
                                            <span className="text-sm font-medium">{blogData.images.length} image{blogData.images.length > 1 ? 's' : ''} selected</span>
                                        </div>
                                    </div>
                                )}

                                {/* Image Preview Grid */}
                                {blogData.images.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-300">Preview</h3>
                                            <span className="text-xs text-gray-500">Click to enlarge</span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                                            {blogData.images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative aspect-square rounded-lg overflow-hidden border-2 border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                                                >
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                    
                                                    {/* Overlay with actions */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between">
                                                            <span className="text-xs text-white/90 font-medium truncate flex-1 mr-2">
                                                                {image.name}
                                                            </span>
                                                            
                                                            <div className="flex gap-1">
                                                                <button
                                                                    onClick={() => setImagePreviewModal(URL.createObjectURL(image))}
                                                                    className="p-1.5 bg-blue-600/90 hover:bg-blue-600 text-white rounded-md transition-colors"
                                                                    title="View full size"
                                                                >
                                                                    <ZoomIn size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => removeImage(index)}
                                                                    className="p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-md transition-colors"
                                                                    title="Remove image"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* File size badge */}
                                                        <div className="absolute top-2 right-2">
                                                            <span className="text-xs bg-black/70 text-white px-2 py-1 rounded-md backdrop-blur-sm">
                                                                {(image.size / 1024 / 1024).toFixed(2)} MB
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Empty State */}
                                {blogData.images.length === 0 && (
                                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-full mb-3">
                                            <Image size={28} className="text-gray-500" />
                                        </div>
                                        <p className="text-sm text-gray-400 mb-1">No images uploaded yet</p>
                                        <p className="text-xs text-gray-500">Click upload to add images</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tags Card */}
                        <div className="bg-[#1f2936] border border-gray-700/50 rounded-xl p-5 shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-green-500/20 rounded-lg">
                                    <Tag size={18} className="text-green-400" />
                                </div>
                                <h2 className="text-white font-bold">Tags</h2>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Add relevant tags</label>
                                <textarea
                                    className='w-full bg-gray-800/50 text-white border border-gray-600 outline-none p-3 rounded-lg resize-none focus:ring-2 focus:ring-green-500 transition-all'
                                    placeholder='#react #javascript #webdev'
                                    name="tags"
                                    value={blogData.tags}
                                    onChange={handleBlogDataChange}
                                    rows={3}
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Image Preview Modal */}
            {imagePreviewModal && (
                <div 
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setImagePreviewModal(null)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] w-full">
                        <button
                            onClick={() => setImagePreviewModal(null)}
                            className="absolute -top-12 right-0 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <img
                            src={imagePreviewModal}
                            alt="Full size preview"
                            className="w-full h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}

            <MobileNavBottom avatarUrl={userAvatar} />

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(31, 41, 55, 0.5);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(139, 92, 246, 0.5);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(139, 92, 246, 0.7);
                }
            `}</style>
        </div>
    )
}

export default CreateBlogPage