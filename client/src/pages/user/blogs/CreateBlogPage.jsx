import React, { useEffect,useState } from 'react'
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
  FileText
} from 'lucide-react';
import MDEditor from "@uiw/react-md-editor"
import rehypeHighlights from "rehype-highlight"
import SpinLoader from "../../../components/SpinLoader"
import Swal from 'sweetalert2'
import MobileNavBottom from '../../../components/MobileNavBottom';


function CreateBlogPage() {

    const [tags,setTags] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    const [blogData,setBlogData] = useState({
        content: "",
        title : "",
        status : "published",
        category : "Full Stack",
        tags : "",
        words : 0,
        images: [],
        characters : 0,
        readingTime : 0
    })

    const handleBlogDataChange = (e) => {
        setBlogData({
            ...blogData,
            [e.target.name] : e.target.value
        })
    }

    const clearData = () => {
        setBlogData({
            content: "",
            title : "",
            status : "published",
            category : "Full Stack",
            tags : "",
            words : 0,
            images: [],
            characters : 0,
            readingTime : 0
        })
    }

    const publishBlog = async () => {
        setLoading(true)
        try {
            console.log("PublishBlog :: blogData :: ", blogData);
            
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
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            });

            console.log(res.data.success)

            if(res.data.success){
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
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Blog Not Published',
                    text: 'There was an error publishing your blog.',
                    background: '#1f2936',
                    color: '#c9d1d9'
                    
                });
            }
            console.log("PublishedBlog :: Response :: ", res.data);
        } catch (error) {
            setError(error.message)
            console.log("PublishedBlog :: Error :: ", error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{

        let content = blogData.content;
        let words = content.split(" ")
        let characters = 0;

        words = words.filter((word)=>word.trim()!=="")
        words.forEach((word)=>{
            characters+=word.length
        })

        // Calculate reading time (average 200 words per minute)
        const readingTimeCalc = Math.ceil(words.length / 200);

        setBlogData({
            ...blogData,
            words : words.length,
            characters : characters,
            readingTime : readingTimeCalc > 0 ? readingTimeCalc : 1
        })
      

    },[blogData.content])
    
    useEffect(() => {
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
                    <div className="hidden md:block h-full md:flex md:gap-2 md:items-center text-gray-400">
                        <Clock size={15}/>
                        <p>{blogData.words} words . {blogData.readingTime} min read</p>
                    </div>

                    <div className="hidden md:block h-full md:flex md:items-center md:gap-5 text-gray-300">
                        <div className='p-2 hover:bg-gray-600 hover:p-2 hover:rounded-md transition-all duration-5'>
                            <Eye size={22}/>
                        </div>

                        <div className='p-2 hover:bg-gray-600 hover:p-2 hover:rounded-md transition-all duration-5'>
                            <Settings size={22} />
                        </div>
                    </div>

                    <div className="h-full flex items-center gap-3 ">
                        <button 
                        disabled={blogData.content.trim().length === 0 || blogData.title.trim().length === 0 || !blogData.images.length}
                        title={blogData.content.trim().length === 0 || blogData.title.trim().length === 0 || !blogData.images.length  ? "Cannot Save Empty Blog" : "Save Blog as Draft"}
                        className='text-md px-3 py-2 hover:bg-gray-600 rounded-md disabled:cursor-not-allowed disabled:text-gray-400 transition-all duration-200'>Save Draft</button>
                        <button
                        onClick={publishBlog}
                        disabled={blogData.content.trim().length === 0 || blogData.title.trim().length === 0 || !blogData.images.length}
                        title={blogData.content.trim().length === 0 || blogData.title.trim().length === 0 || !blogData.images.length ? "Title and content are required to publish" : "Publish Blog"}
                        className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-md px-3 text-lg py-1 transition-all duration-200 hover:shadow-lg">{loading ? <SpinLoader/> : "Publish"}</button>
                    </div>
                </div>
            </nav>

            <div className="md:h-[870px] w-screen flex flex-col items-center gap-3 md:gap-5 py-2 md:flex-row md:justify-center">

                <div className="w-[95%] md:w-[60%] flex flex-col gap-4">
                    {/* Title Input Section */}
                    <div className="w-full">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Type className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="title"
                                value={blogData.title}
                                onChange={handleBlogDataChange}
                                placeholder="Enter your blog title..."
                                className="w-full pl-10 pr-4 py-3 text-xl font-semibold bg-[#1f2936] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                maxLength={200}
                            />
                        </div>
                        <div className="mt-1 text-right text-xs text-gray-400">
                            {blogData.title.length}/200 characters
                        </div>
                    </div>

                    {/* Enhanced Editor */}
                    <div className="relative">
                        <MDEditor
                            value={blogData.content}
                            onChange={(value) => setBlogData({ ...blogData, content: value || "" })}
                            preview="edit"
                            height={680}
                            className='dark:bg-[#1f2936] dark:rounded-lg border border-gray-700 overflow-hidden'
                            data-color-mode="dark"
                            previewOptions={{
                                rehypePlugins:[[rehypeHighlights, { detect: true }]]
                            }}
                            textareaProps={{
                                placeholder: 'Start writing your blog content here...\n\nYou can use Markdown syntax:\n- **bold text**\n- *italic text*\n- `code`\n- # Heading\n- [link](url)\n- ![image](url)',
                                className: 'dark:bg-[#1f2936] dark:text-white',
                                style: {
                                    fontSize: '14px',
                                    lineHeight: '1.6',
                                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
                                }
                            }}
                        />
                        
                        {/* Content Stats Overlay */}
                        <div className="absolute bottom-2 right-2 bg-[#374150] rounded-md px-2 py-1 text-xs text-gray-300 opacity-75">
                            <FileText size={12} className="inline mr-1" />
                            {blogData.words} words
                        </div>
                    </div>
                </div>

                <div className="w-[95%] md:w-[20%] flex flex flex-col gap-5 md:gap-5 pb-7">
                    {/* Publish Settings */}
                    <div className="border border-gray-700 flex flex-col gap-4 items-start rounded-lg w-full dark:bg-[#1f2936] p-5 shadow-lg">
                        <div className="flex items-center gap-2">
                            <Settings size={18} className="text-blue-400" />
                            <h1 className="text-md text-white font-bold">Publish Settings</h1>
                        </div>
                        
                        <div className="w-full flex flex-col gap-2 text-gray-300">
                            <label className="text-sm font-medium flex items-center gap-1">
                                <Globe size={14} />
                                Status
                            </label>
                            <select 
                                value={blogData.status} 
                                onChange={(e) => setBlogData({ ...blogData, status: e.target.value })} 
                                className='dark:bg-[#374150] border border-gray-600 outline-none p-2 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200'
                            >
                                <option value="draft">📝 Draft</option>
                                <option value="published">🌍 Published</option>
                                <option value="private">🔒 Private</option>
                            </select>
                        </div>

                        <div className="w-full flex flex-col gap-2 text-gray-300">
                            <label className="text-sm font-medium flex items-center gap-1">
                                <Tag size={14} />
                                Category
                            </label>
                            <select
                                value={blogData.category} 
                                onChange={(e)=>{
                                    setBlogData({...blogData , category:e.target.value})
                                }}
                                className='dark:bg-[#374150] border border-gray-600 outline-none p-2 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200'
                            >
                                {categories.map((category,index)=>(
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Tags Section */}
                    <div className="w-full flex flex-col gap-4 dark:bg-[#1f2936] p-5 rounded-lg border border-gray-700 shadow-lg">
                        <div className="flex items-center gap-2">
                            <Tag size={18} className="text-green-400" />
                            <h1 className="text-white text-md font-bold">Tags</h1>
                        </div>
                        
                        <div className="flex w-full gap-4 items-start flex-col text-gray-300">
                            <textarea
                                className='w-full h-20 dark:bg-[#374150] dark:text-white border border-gray-600 outline-none p-3 rounded-md resize-none focus:ring-2 focus:ring-green-500 transition-all duration-200'
                                placeholder='Add tags separated by # (e.g., #react #javascript #webdev)'
                                name="tags"
                                value={blogData.tags}
                                onChange={handleBlogDataChange}
                                rows={3}
                            />
                            
                            {/* Image Upload Section */}
                            <div className="w-full">
                                <label className="text-sm font-medium flex items-center gap-1 mb-2">
                                    <Image size={14} />
                                    Upload Images
                                </label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    multiple
                                    onChange={(e)=>{
                                        setBlogData((prev)=>{
                                            return{
                                                ...prev,
                                                images : [...prev.images , ...Array.from(e.target.files)]
                                            }
                                        })
                                    }}
                                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all duration-200"
                                />
                                {blogData.images.length > 0 && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        {blogData.images.length} image(s) selected
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="w-full flex flex-col gap-4 dark:bg-[#1f2936] p-5 rounded-lg border border-gray-700 shadow-lg">
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-purple-400" />
                            <h1 className="text-white text-md font-bold">Statistics</h1>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-center w-full p-2 bg-[#374150] rounded-md">
                                <p className='dark:text-gray-300 text-sm font-medium'>Words:</p>
                                <p className='dark:text-white text-sm font-bold'>{blogData.words}</p>
                            </div>
                            
                            <div className="flex justify-between items-center w-full p-2 bg-[#374150] rounded-md">
                                <p className='dark:text-gray-300 text-sm font-medium'>Characters:</p>
                                <p className='dark:text-white text-sm font-bold'>{blogData.characters}</p>
                            </div>
                            
                            <div className="flex justify-between items-center w-full p-2 bg-[#374150] rounded-md">
                                <p className='dark:text-gray-300 text-sm font-medium'>Reading Time:</p>
                                <p className='dark:text-white text-sm font-bold'>{blogData.readingTime} min</p>
                            </div>

                            <div className="flex justify-between items-center w-full p-2 bg-[#374150] rounded-md">
                                <p className='dark:text-gray-300 text-sm font-medium'>Title Length:</p>
                                <p className='dark:text-white text-sm font-bold'>{blogData.title.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MobileNavBottom />
        </div>
    )
}

export default CreateBlogPage
