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
  Search, 
  Zap, 
  Shield, 
  Edit3, 
  TrendingUp,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  BookOpen,
  UserPlus
} from 'lucide-react';

import HomePageBox from '../../components/HomePageBox';
import HomePageBox2 from '../../components/HomePageBox2';
import TestimonialCard from '../../components/TestimonialCard';

const Home = () => {
  const [isDark, setIsDark] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer @ Google",
      content: "DevMark has become my go-to platform for sharing technical insights. The community engagement is incredible.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Lead @ Stripe",
      content: "The rich editor and seamless publishing experience make writing a joy. Highly recommend!",
      avatar: "MR"
    },
    {
      name: "Aisha Patel",
      role: "AI Researcher @ OpenAI",
      content: "Best platform for technical content. The discovery features help me find exactly what I'm looking for.",
      avatar: "AP"
    }
  ];

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
   {/* <div className="h-[100vh] w-[100vw] bg-white dark:bg-[#111827] "> */}
    <nav className='w-full  h-20 py-5 flex justify-around items-center fixed top-0 z-[55] bg-white dark:bg-[#111827] border-b-[0.2px] border-b-gray-800 bg-transparent backdrop-blur-md'>
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
          <Link to="#">Pricing</Link>
          <Link to="#">About</Link>
        </div>

       <div className="flex text-white justify-around items-center gap-5 md:gap-10">
         <div
        onClick={handleTheme}
        className="border-[1.2px] border-gray-300 dark:border-gray-600 w-8 h-8 sm:flex sm:justify-center sm:items-center rounded-md bg-white dark:bg-[#182231] cursor-pointer hidden sm:block">
          {
            !isDark && <Moon className="text-gray-500 " size={20}/>
          }
          {
            isDark && <Sun className="text-yellow-500" size={20}/>
          }
        </div>

        <button className=" rounded-md  text-black dark:text-white text-md md:text-lg lg:text-xl ">Sign in</button>
        <button className=" border-white rounded-md px-4 py-2 bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-sm font-bold  text-md md:text-lg lg:text-lg">Get Started</button>

       </div>
        
    </nav>

    <div className="w-full flex flex-col justify-center items-center gap-10 dark:bg-[#111827] pt-10 pb-20 ">
          <div className=" text-sm w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[20%] xl:max-w-[300px] flex border-[1.2px] dark:border-[0.3px] dark:border-gray-600 border-gray-300 justify-center items-center  py-1 px-1 text-white mt-4 md:mt-10 rounded-xl dark:bg-[#18212f] text-black dark:text-white"><Star className="text-yellow-500 text-sm mx-1" size={15}/> <p className="text-black dark:text-white">Trusted by 50,000+ developers worldwide</p></div>

          <div className=" text-black dark:text-white text-4xl sm:text-7xl lg:text-7xl text-center font-bold  p-2 lg:max-w-[900px] ">
            Where Developers <span className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-transparent bg-clip-text">Share</span> & Grow
          </div>

          <div className="dark:text-white text-black text-xl lg:text-2xl text-center xl:max-w-[900px] text-[rgb(173 213 219)]">
            The modern publishing platform built for developers. Write, share, and discover technical content with a community that understands your passion for code.
          </div>

          <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center">
            <button className="rounded-xl px-6 py-5 text-white bg-gradient-to-r from-[#4777f4] to-[#9035ea] font-bold ">
              Start Writing Today <ArrowRight className="inline-block" />
            </button>

            <button className=" rounded-xl px-6 py-5 text-black dark:text-white border-[1.2px] dark:border-[1.8px] border-gray-500 dark:border-gray-600 ml-5 font-bold ">
                <Play className="inline-block" /> Watch Demo
              </button>
          </div>

          <div className="flex flex-wrap  items-center justify-center gap-8">

            <HomePageBox number="50K+" label="Active Writers" />
            <HomePageBox number="2M+" label="Articles Published" />
            <HomePageBox number="10M+" label="Monthly Readers" />
            <HomePageBox number="99.9%" label="Uptime" />

          </div>
    </div>

    <div className=" dark:bg-[#1f2937] py-20">

          <div className="text-white flex flex-col items-center gap-5">
              <p className='dark:text-white text-black text-4xl md:text-6xl font-bold text-center max-w-[400px] md:max-w-[600px]'>Everything You Need to <span className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-transparent bg-clip-text">Succeed</span></p>

              <p className='dark:text-white text-black text-xl text-center max-w-[400px] md:max-w-[770px]'>Powerful features designed to help developers create, share, and grow their influence in the tech community.</p>
          </div>

          <div className="w-full h-auto flex flex-col md:flex-row flex-wrap justify-center items-center gap-10 mt-10  dark:text-white text-black ">
            <HomePageBox2 number="Advanced Authentication" label="Secure login with social OAuth, JWT tokens, and role-based access control"  icon={<Shield className='text-white' size={24}/>}/>

            <HomePageBox2 number="Rich Content Creation" label="Powerful WYSIWYG editor with Markdown support, drafts, and instant publishing"  icon={<Edit3 className='text-white' size={24}/>}/>

            <HomePageBox2 number="Smart Discovery" label="AI-powered recommendations, advanced search, and intelligent content filtering"   icon={<Search className='text-white' size={24}/>}/>

            <HomePageBox2 number="Engaging Community" label="Nested comments, real-time notifications, and social sharing capabilities"  icon={<MessageCircle className='text-white' size={24}/>}/>

            <HomePageBox2 number="Professional Profiles" label="Custom bios, portfolios, follower system, and comprehensive analytics"  icon={<Users className='text-white' size={24}/>}/>

            <HomePageBox2 number="Content Analytics" label="Track engagement, monitor growth, and optimize your content strategy"  icon={<TrendingUp className='text-white' size={24}/>}/>
          </div>

    </div>

    <div className="dark:bg-[#111827] w-full pt-20 pb-10">
          <div className="flex flex-col items-center gap-5">
            <p className='dark:text-white text-black text-center text-4xl lg:text-5xl font-bold'>Loved by Developers <span className='bg-gradient-to-r from-[#3d80f6] to-[#9235eb] text-transparent bg-clip-text'>Worldwide</span></p>
            <p className='text-black dark:text-white text-center text-md lg:text-xl'>See what industry leaders are saying about DevMark</p>
          </div>

          <div className='w-full h-auto flex flex-col flex-wrap gap-7 md:flex-row  items-center justify-center py-10'>

            <TestimonialCard testimonial={{
              avatar: "SC",
              name: "Sarah Chen",
              role: "Senior Developer at Google",
              content: "DevMark has become my go-to platform for sharing technical insights. The community engagement is incredible."
            }} />

            <TestimonialCard testimonial={{
              avatar: "JD",
              name: "John Doe",
              role: "Lead Engineer at Microsoft",
              content: "DevMark has streamlined our content creation process. The tools are intuitive and powerful."
            }} />

            <TestimonialCard testimonial={{
              avatar: "MR",
              name: "Marcus Rodriguez",
              role: "Tech Lead @ Stripe",
              content: "The rich editor and seamless publishing experience make writing a joy. Highly recommend!"
            }} />

          </div>
    </div>

    <div className='dark:bg-gradient-to-r from-[#212e41] to-[#1f2938] pt-10 md:pt-20 pb-10 flex flex-col items-center gap-10'>
            <div className='flex flex-col items-center gap-5'>
                <p className='text-white font-bold text-4xl text-center'>Ready to Share Your <span className='bg-gradient-to-r from-[#3d80f6] to-[#9235eb] text-transparent bg-clip-text'>Developer Journey?</span></p>
                <p className='text-gray-300 text-center text-xl max-w-[85%]'>Join thousands of developers who are already building their reputation and growing their network on DevMark.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">

              <button className='bg-gradient-to-r from-[#3d80f6] to-[#9235eb] text-white min-w-[200px] max-w-[300px] px-5 py-4 text-lg font-semibold rounded-lg flex items-center'>
                <UserPlus className='inline-block text-white mr-2' size={20} />
                Create Your Account
              </button>

              <button className='text-white'>
                <BookOpen className='inline-block text-white mr-2' size={20} />
                Explore Articles
              </button>

            </div>

            <div className='text-white'>
              <p>Follow us:</p>
              
            </div>
    </div>


   </div>
  );
};

export default Home;