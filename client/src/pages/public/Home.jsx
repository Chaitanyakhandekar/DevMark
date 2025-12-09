import React, { useState, useEffect } from 'react';
import "../../App.css"
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Code, 
  Users, 
  MessageCircle, 
  Heart, 
  Shield, 
  Edit3, 
  Star,
  ArrowRight,
  Play,
  BookOpen,
  UserPlus,
  Menu,
  Bookmark,
  Image,
  Lock
} from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import HomePageBox from '../../components/HomePageBox';
import HomePageBox2 from '../../components/HomePageBox2';
import TestimonialCard from '../../components/TestimonialCard';

const Home = () => {
  const [isDark, setIsDark] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileSidebar,setMobileSidebar] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    const html = document.documentElement
    if(!html.classList.contains("dark")){
      html.classList.add("dark")
      setIsDark(true)
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleTheme = ()=>{
    const html = document.documentElement

    if(html.classList.contains("dark")){
      setIsDark(false)
      html.classList.remove("dark")
      html.classList.add("light")
    }else{
      setIsDark(true)
      html.classList.remove("light")
      html.classList.add("dark")
    }
  }

  return (
   <div className="h-[100vh] w-min-screen bg-white relative pt-10">

    {/* Mobile Sidebar */}
    {
      mobileSidebar && 

      <div className="block md:hidden fixed top-20 bg-white dark:bg-[#111826] text-gray-800 dark:text-white w-full  backdrop-blur-md flex flex-col gap-5 items-start transition-all duration-[300ms] z-[60] border-b-[0.2px] border-b-gray-800 pb-3 text-gray-800 dark:text-gray-300 ">
        <p className='border-[0.2px] border-b-gray-300 dark:border-b-gray-600 border-t-0 border-l-0 border-r-0 w-full px-3 py-2'>Features</p>
        <p className='border-[0.2px] border-b-gray-300 dark:border-b-gray-600 border-t-0 border-l-0 border-r-0 w-full px-3 py-2'>Community</p>
        <p className='border-[0.2px] border-b-gray-300 dark:border-b-gray-600 border-t-0 border-l-0 border-r-0 w-full px-3 py-2'>About</p>
        <div className="w-full flex flex-col items-start  gap-5 px-3">
          <Link to="/login" className="">Sign in</Link>
          <Link to="/user/feed" className="text-center font-bold w-[95%] bg-gradient-to-r mb-2 py-3 from-[#4777f4] to-[#9035ea] text-white rounded-md px-4 py-2">Get Started</Link>
        </div>
      </div>
    }

    <nav className='w-full  h-20 py-5 flex justify-around items-center fixed top-0 z-[55] bg-white dark:bg-[#111827] border-b-[0.2px] border-b-gray-300 dark:border-b-gray-800 bg-transparent backdrop-blur-md'>
        <div className="h-full flex justify-center items-center gap-2">
          <div className=" h-10 sm:h-12 w-10 sm:w-12 flex justify-center items-center bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-mono font-bold rounded-md">
          {'<>'}
        </div>
        <div className="text-black dark:text-white text-3xl sm:text-3xl font-bold">
          DevMark
        </div>
        </div>

        <div className="hidden sm:hidden md:block text-gray-600 dark:text-white md:flex gap-4 text-lg sm:text-lg">
          <Link to="#">Features</Link>
          <Link to="#">Community</Link>
          <Link to="#">About</Link>
        </div>

       <div className="flex text-white justify-around items-center gap-5 md:gap-10">
         <div
        onClick={handleTheme}
        className="border-[1.2px] border-gray-300 dark:border-gray-600 w-8 h-8 flex justify-center items-center rounded-md bg-white dark:bg-[#182231] cursor-pointer">
          {
            !isDark && <Moon className="text-gray-500 " size={20}/>
          }
          {
            isDark && <Sun className="text-yellow-500" size={20}/>
          }
        </div>

        <Link to="/login" className="hidden md:block rounded-md  text-black dark:text-white text-md md:text-lg lg:text-xl ">Sign in</Link>
        <Link to="/user/feed" className="hidden md:block border-white rounded-md px-4 py-2 bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-sm font-bold  text-md md:text-lg lg:text-lg">Get Started</Link>

        <div
        onClick={()=>{setMobileSidebar(!mobileSidebar)}}
        className="block md:hidden">
        <Menu className='text-gray-600 dark:text-white' size={24}/>
        </div>
       </div>
        
    </nav>

    <div className="w-full flex flex-col justify-center items-center gap-10 dark:bg-[#111827] pt-10 pb-20 ">
          <div className=" text-sm w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[20%] xl:max-w-[300px] flex border-[1.2px] dark:border-[0.3px] dark:border-gray-600 border-gray-300 justify-center items-center  py-1 px-1 text-white mt-4 md:mt-10 rounded-xl dark:bg-[#18212f] text-black dark:text-white"><Star className="text-yellow-500 text-sm mx-1" size={15}/> <p className="text-black dark:text-white">Built for developers, by developers</p></div>

          <div className=" text-black dark:text-white text-4xl sm:text-7xl lg:text-7xl text-center font-bold  p-2 lg:max-w-[900px] ">
            Where Developers <span className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-transparent bg-clip-text">Write</span> & Connect
          </div>

          <div className="dark:text-white text-black text-xl lg:text-2xl text-center xl:max-w-[900px] text-[rgb(173 213 219)] px-3">
            A social platform designed for developers to publish technical content, connect with peers, and build a professional profile.
          </div>

          <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center">
            <button onClick={()=> { navigate("/user/blogs/create")}} className="rounded-xl px-6 py-5 text-white bg-gradient-to-r from-[#4777f4] to-[#9035ea] font-bold ">
              Start Writing Today <ArrowRight className="inline-block" />
            </button>

            <button onClick={()=> { navigate("/user/feed")}} className=" rounded-xl px-6 py-5 text-black dark:text-white border-[1.2px] dark:border-[1.8px] border-gray-500 dark:border-gray-600 ml-5 font-bold ">
                <BookOpen className="inline-block" /> Explore Blogs
              </button>
          </div>

          <div className="flex flex-wrap  items-center justify-center gap-8">

            <HomePageBox number="Write" label="Share Your Expertise" />
            <HomePageBox number="Connect" label="Follow Developers" />
            <HomePageBox number="Engage" label="Like & Comment" />
            <HomePageBox number="Save" label="Bookmark Posts" />

          </div>
    </div>

    <div className=" dark:bg-[#1f2937] py-20">

          <div className="text-white flex flex-col items-center gap-5 px-3">
              <p className='dark:text-white text-black text-4xl md:text-6xl font-bold text-center max-w-[400px] md:max-w-[600px]'>Everything You Need to <span className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-transparent bg-clip-text">Publish</span></p>

              <p className='dark:text-white text-black text-lg text-center max-w-[400px] md:max-w-[770px]'>Simple, robust features to help developers publish technical content and grow their work publicly.</p>
          </div>

          <div className="w-full h-auto flex flex-col md:flex-row flex-wrap justify-center items-center gap-10 mt-10  dark:text-white text-black ">
            <HomePageBox2 number="Email Verification" label="Account activation via secure email verification link (no OTP required)"  icon={<Shield className='text-white' size={24}/>}/>

            <HomePageBox2 number="Blog Publishing" label="Create and manage blog posts with image uploads, draft saving, and instant publishing"  icon={<Edit3 className='text-white' size={24}/>}/>

            <HomePageBox2 number="Dynamic Feed" label="Discover trending content, explore posts by tags, and find suggested developers to follow"  icon={<BookOpen className='text-white' size={24}/>}/>

            <HomePageBox2 number="Social Features" label="Like posts, comment on articles, follow developers, and engage with the community"  icon={<MessageCircle className='text-white' size={24}/>}/>

            <HomePageBox2 number="Custom Profiles" label="Showcase your skills, add social links, upload avatars (Cloudinary), and view basic stats"  icon={<Users className='text-white' size={24}/>}/>

            <HomePageBox2 number="Bookmarks" label="Save your favorite posts for later reading and organize your content library"  icon={<Bookmark className='text-white' size={24}/>}/>
          </div>

    </div>

    <div className="dark:bg-[#111827] w-full pt-20 pb-10">
          <div className="flex flex-col items-center gap-5 px-2">
            <p className='dark:text-white text-black text-center text-4xl lg:text-5xl font-bold'>How It <span className='bg-gradient-to-r from-[#3d80f6] to-[#9235eb] text-transparent bg-clip-text'>Works</span></p>
            <p className='text-black dark:text-white text-center text-md lg:text-xl'>Get started in three easy steps</p>
          </div>

          <div className='w-full h-auto flex flex-col flex-wrap gap-7 md:flex-row  items-center justify-center py-10'>

            <TestimonialCard testimonial={{
              avatar: "1",
              name: "1. Create your profile",
              role: "Sign up & verify",
              content: "Register with your email and activate your account through the verification link sent to your inbox. Then add a display name, avatar and social links."
            }} />

            <TestimonialCard testimonial={{
              avatar: "2",
              name: "2. Write & save drafts",
              role: "Compose articles",
              content: "Use the editor to write posts, include code blocks and images, and save drafts to polish later before publishing."
            }} />

            <TestimonialCard testimonial={{
              avatar: "3",
              name: "3. Publish & engage",
              role: "Publish and interact",
              content: "Publish your post to the community. Read, like, comment, follow other authors, and bookmark posts you want to revisit."
            }} />

          </div>
    </div>

    <div className='dark:bg-gradient-to-r from-[#212e41] to-[#1f2938] pt-10 md:pt-20 pb-10 flex flex-col items-center gap-10'>
            <div className='flex flex-col items-center gap-5 xl:max-w-[800px] px-3'>
                <p className='text-gray-800 dark:text-white font-bold text-4xl lg:text-5xl text-center'>Ready to Join the <span className='bg-gradient-to-r from-[#3d80f6] to-[#9235eb] text-transparent bg-clip-text'>Developer Community?</span></p>
                <p className='text-gray-700 dark:text-gray-300 text-center text-xl max-w-[85%]'>Start writing, publishing, and connecting with developers who share your passion for technology.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">

              <button onClick={() => {navigate("/signup")}} className='bg-gradient-to-r from-[#3d80f6] to-[#9235eb] text-white min-w-[200px] max-w-[300px] px-5 py-4 text-lg font-semibold rounded-lg flex items-center'>
                <UserPlus className='inline-block text-white mr-2' size={20} />
                Create Your Account
              </button>

              <button onClick={() => {navigate("/user/feed")}} className='text-gray-800  dark:text-white'>
                <BookOpen className='inline-block text-gray-800 dark:text-white mr-2' size={20} />
                Explore Blogs
              </button>

            </div>

            <div className='text-gray-500 dark:text-white flex gap-5 text-gray-600'>
              <p>Follow us:</p>
              <FaGithub className='text-gray-400 cursor-pointer' size={20}/>
              <FaLinkedin className='text-gray-400 cursor-pointer' size={20}/>
              <FaTwitter className='text-gray-400 cursor-pointer' size={20}/>

            </div>
    </div>

    <div className="w-full h-auto dark:bg-[#111826] pb-10 pt-10 border-[0.3px] border-t-gray-600 border-b-0 border-l-0 border-r-0 flex-col gap-10 flex justify-center items-center">

             <div className="l-1 h-full w-full text-gray-800 dark:text-gray-300 flex flex-col lg:flex-row justify-between lg:justify-center items-start pl-5 text-sm lg:text-lg lg:items-start gap-5 lg:gap-[10%] text-lg">
              <div className="l2 flex flex-col justify-center items-start gap-5 pb-5 lg:pb-0">
              <div className="flex items-center gap-2 ">
                  <div className="bg-gradient-to-r from-[#3f7eea] to-[#9339e5] w-10 h-10 flex justify-center items-center rounded-md text-xl font-semibold text-white">
                  {`<>`}
                </div>
                <h1 className="text-xl font-bold">DevMark</h1>
              </div>
                <p className="text-gray-500 dark:text-gray-300 max-w-[300px]">A social platform for developers to write blogs, share knowledge, and build connections.</p>
              </div>
              <div className="l2 flex flex-col justify-center items-start gap-5">
                <h1 className='text-gray-900 dark:text-white font-bold'>Product</h1>
                <ul>
                  <li>Features</li>
                  <li>Blog</li>
                  <li>Community</li>
                </ul>
              </div>
              <div className="l2 flex flex-col justify-center items-start gap-5">
                <h1 className='text-gray-900 dark:text-white font-bold'>Resources</h1>
                <ul>
                  <li>Documentation</li>
                  <li>Support</li>
                  <li>Guidelines</li>
                </ul>
              </div>
              <div className="l2 flex flex-col justify-center items-start gap-5">
                <h1 className='text-gray-900 dark:text-white font-bold'>Company</h1>
                <ul>
                  <li>About Us</li>
                  <li>Contact</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>

            <div className="text-gray-400 border-[0.2px] border-t-gray-600 border-b-0 border-l-0 border-r-0 w-[70%] flex flex-col md:flex-row text-sm md:text-lg justify-between py-5 items-center">
              <p>© 2025 DevMark. All rights reserved.</p>
              <p>Made with ❤️ for developers</p>
            </div>

    </div>

   </div>
  );
};

export default Home;
