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
  Plus
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
        content: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        title : "This is a sample title",
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
            content: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            title : "This is a sample title",
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

            formData.append("title", blogData.title || "Hello");
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

        setBlogData({
            ...blogData,
            words : words.length,
            characters : characters
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
                        disabled={blogData.content.trim().length === 0}
                        title={blogData.content.trim().length === 0 ? "Cannot Save Empty Blog" : "Save Blog as Draft"}
                        className='text-md px-3 py-2 hover:bg-gray-600 rounded-md disabled:cursor-not-allowed disabled:text-gray-400'>Save Draft</button>
                        <button
                        onClick={publishBlog}
                        disabled={blogData.content.trim().length === 0}
                        title={blogData.content.trim().length === 0 ? "Cannot Publish Empty Blog" : "Publish Blog"}
                        className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] disabled:text-gray-400 disabled:cursor-not-allowed text-white  font-semibold rounded-md px-3 text-lg py-1 ">{loading ? <SpinLoader/> : "Publish"}</button>
                    </div>
                </div>
            </nav>

            <div className="md:h-[870px]  w-screen flex flex-col items-center gap-3 md:gap-5 py-2 md:flex-row md:justify-center">

                <div className=" w-[95%] md:w-[60%]">
                    <MDEditor
                        value={blogData.content}
                        onChange={(value) => setBlogData({ ...blogData, content: value })}
                        preview="live"
                        height={750}
                        className='dark:bg-[#1f2936] dark:rounded-lg md:p-5'
                        previewOptions={{
                            rehypePlugins:[[rehypeHighlights]]
                        }}
                    />
                </div>

                <div className=" w-[95%] md:w-[20%] flex flex flex-col gap-5 md:gap-[4.2rem] pb-7">
                    <div className="border-[0.2px] border-gray-700 flex flex-col gap-3 items-start rounded-md w-full dark:bg-[#1f2936] p-5">
                        <h1 className="text-md text-white font-bold">Publish Settings</h1>
                        <div className="w-full flex flex-col gap-2 text-gray-300">
                            <label>Status</label>

                            <select value={blogData.status} onChange={(e) => setBlogData({ ...blogData, status: e.target.value })} className='dark:bg-[#374150] border-none outline-none p-2 rounded-md'>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        <div className="w-full flex flex-col gap-2 text-gray-300">
                            <label>Category</label>

                            <select
                            value={blogData.category} 
                            onChange={(e)=>{
                                setBlogData({...blogData , category:e.target.value})
                            }}
                             className='dark:bg-[#374150] border-none outline-none p-2 rounded-md'>

                                {
                                    categories.map((category,index)=>(
                                        <option key={index} value={category}>{category}</option>
                                    ))
                                }

                            </select>
                        </div>

                    </div>

                    <div className="w-full flex flex-col gap-5 dark:bg-[#1f2936] p-5 rounded-md">
                            <h1 className="text-white text-md font-bold">Tags</h1>
                            <div className="flex w-full gap-5 items-center flex-col text-gray-300">
                                 <textarea
                                  className='w-full h-20 dark:bg-[#374150] dark:text-white border-none outline-none p-2 rounded-md'
                                   placeholder='Add a tag'
                                   name="tags"
                                   value={blogData.tags}
                                   onChange={(e)=>{
                                    handleBlogDataChange(e)
                                   }}
                                   rows={3} >

                                   </textarea>
                            {/* <div className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] p-2 w-10 h-10 flex justify-center items-center rounded-md">
                                <Plus className="text-white" size={19}/>
                            </div> */}

                            <input type="file" onChange={(e)=>{
                                setBlogData((prev)=>{
                                    return{
                                        ...prev,
                                        images : [...prev.images , e.target.files[0]]
                                    }
                                })
                            }} />
                            </div>

                            {/* <p className='dark:text-gray-300 text-sm md:text-md'>0/5 tags used</p> */}
                    </div>

                    <div className="w-full flex flex-col gap-5 dark:bg-[#1f2936] p-5 rounded-md">
                            <h1 className="text-white text-md font-bold">Statistics</h1>
                            <div className="flex justify-between w-full">
                                <p className='dark:text-gray-300 text-sm md:text-md'>Words:</p>
                                <p className='dark:text-gray-300 text-sm md:text-md'>{blogData.words}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className='dark:text-gray-300 text-sm md:text-md'>Characters:</p>
                                <p className='dark:text-gray-300 text-sm md:text-md'>{blogData.characters}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className='dark:text-gray-300 text-sm md:text-md'>Reading Time:</p>
                                <p className='dark:text-gray-300 text-sm md:text-md'>{blogData.readingTime} min</p>
                            </div>
                    </div>


                </div>
            </div>

            <MobileNavBottom />

        </div>
    )
}

export default CreateBlogPage