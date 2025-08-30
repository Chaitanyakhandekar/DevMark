import React, { useState, useEffect } from 'react';
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
  Github,
  Twitter,
  Linkedin,
  Globe,
  BookOpen,
  UserPlus
} from 'lucide-react';

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

  const theme = {
    bg: isDark ? 'bg-gray-900' : 'bg-white',
    bgSecondary: isDark ? 'bg-gray-800' : 'bg-gray-50',
    bgCard: isDark ? 'bg-gray-800/50' : 'bg-white',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    accent: 'from-blue-500 to-purple-600',
    accentHover: 'from-blue-600 to-purple-700',
    glass: isDark ? 'bg-gray-900/80 backdrop-blur-xl border-gray-800/50' : 'bg-white/80 backdrop-blur-xl border-gray-200/50'
  };

  const features = [
    {
      icon: Shield,
      title: "Advanced Authentication",
      description: "Secure login with social OAuth, JWT tokens, and role-based access control"
    },
    {
      icon: Edit3,
      title: "Rich Content Creation",
      description: "Powerful WYSIWYG editor with Markdown support, drafts, and instant publishing"
    },
    {
      icon: Search,
      title: "Smart Discovery",
      description: "AI-powered recommendations, advanced search, and intelligent content filtering"
    },
    {
      icon: MessageCircle,
      title: "Engaging Community",
      description: "Nested comments, real-time notifications, and social sharing capabilities"
    },
    {
      icon: Users,
      title: "Professional Profiles",
      description: "Custom bios, portfolios, follower system, and comprehensive analytics"
    },
    {
      icon: TrendingUp,
      title: "Content Analytics",
      description: "Track engagement, monitor growth, and optimize your content strategy"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Writers" },
    { number: "2M+", label: "Articles Published" },
    { number: "10M+", label: "Monthly Readers" },
    { number: "99.9%", label: "Uptime" }
  ];

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
   <div className="h-[100vh] w-[100vw] bg-white dark:bg-[#111827] ">
    <nav className='w-[full] border-1 h-[10%] flex justify-around items-center  sticky top-2'>
        <div className="h-full flex justify-center items-center gap-2">
          <div className=" h-10 sm:h-12 w-10 sm:w-12 flex justify-center items-center bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-mono font-bold rounded-md">
          {'<>'}
        </div>
        <div className="text-black dark:text-white text-3xl sm:text-3xl font-extrabold font-mono">
          DevMark
        </div>
        </div>

        <div className="hidden sm:hidden md:block text-black dark:text-white md:flex gap-4 text-lg sm:text-xl">
          <Link to="#">Features</Link>
          <Link to="#">Community</Link>
          <Link to="#">Pricing</Link>
          <Link to="#">About</Link>
        </div>

       <div className="flex text-white justify-around items-center gap-3">
         <div
        onClick={handleTheme}
        className="border-2 border-gray-500 w-8 h-8 sm:flex sm:justify-center sm:items-center rounded-md bg-white dark:bg-[#182231] cursor-pointer hidden sm:block">
          {
            !isDark && <Moon className="text-gray-500"/>
          }
          {
            isDark && <Sun className="text-yellow-500"/>
          }
        </div>

        <button className=" rounded-md  text-black dark:text-white text-md md:text-lg lg:text-xl ">Sign in</button>
        <button className=" border-white rounded-md px-4 py-2 bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-md font-bold font-mono text-md md:text-lg lg:text-xl">Get Started</button>

       </div>
        
    </nav>

    <div className="w-full flex flex-col justify-center items-center gap-10">
          <div className=" text-sm w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[20%] flex border border-gray-500 justify-center items-center  py-1 px-1 text-white mt-10 rounded-xl bg-[#18212f]"><Star className="text-yellow-500 text-sm mx-1" size={15}/> Trusted by 50,000+ developers worldwide</div>

          <div className="text-white text-5xl sm:text-7xl lg:text-7xl text-center font-bold font-mono p-2 lg:max-w-[900px]">
            Where Developers <span className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-transparent bg-clip-text">Share</span> & Grow
          </div>

          <div className="text-white text-xl lg:text-2xl text-center xl:max-w-[900px] text-[rgb(173 213 219)]">
            The modern publishing platform built for developers. Write, share, and discover technical content with a community that understands your passion for code.
          </div>

          <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center">
            <button className=" rounded-xl px-6 py-5 text-white bg-gradient-to-r from-[#4777f4] to-[#9035ea] font-bold ">
              Start Writing Today <ArrowRight className="inline-block" />
            </button>

            <button className=" rounded-xl px-6 py-5 text-white border border-gray-500 ml-5 font-bold ">
                <Play className="inline-block" /> Watch Demo
              </button>
          </div>
    </div>
   </div>
  );
};

export default Home;