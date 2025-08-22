import React, { useState, useEffect } from 'react';
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

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.bg}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? `${theme.glass} border-b ${theme.border}` : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-xl bg-gradient-to-r ${theme.accent}`}>
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className={`text-2xl font-bold ${theme.text}`}>DevMark</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`${theme.textSecondary} hover:${theme.text} transition-colors`}>Features</a>
              <a href="#community" className={`${theme.textSecondary} hover:${theme.text} transition-colors`}>Community</a>
              <a href="#pricing" className={`${theme.textSecondary} hover:${theme.text} transition-colors`}>Pricing</a>
              <a href="#about" className={`${theme.textSecondary} hover:${theme.text} transition-colors`}>About</a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${theme.bgCard} ${theme.border} border hover:scale-105 transition-all duration-200`}
              >
                {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
              </button>
              <button className={`px-4 py-2 ${theme.textSecondary} hover:${theme.text} transition-colors`}>
                Sign In
              </button>
              <button className={`px-6 py-2 bg-gradient-to-r ${theme.accent} hover:${theme.accentHover} text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl`}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${theme.bgCard} ${theme.border} border mb-8`}>
              <Star className="h-4 w-4 text-yellow-500" />
              <span className={`text-sm ${theme.textSecondary}`}>Trusted by 50,000+ developers worldwide</span>
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-bold ${theme.text} mb-6 leading-tight`}>
              Where Developers
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Share </span>
              & Grow
            </h1>
            
            <p className={`text-xl md:text-2xl ${theme.textSecondary} mb-12 leading-relaxed`}>
              The modern publishing platform built for developers. Write, share, and discover 
              technical content with a community that understands your passion for code.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className={`px-8 py-4 bg-gradient-to-r ${theme.accent} hover:${theme.accentHover} text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-2`}>
                <span>Start Writing Today</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button className={`px-8 py-4 ${theme.bgCard} ${theme.text} ${theme.border} border rounded-xl font-semibold text-lg hover:${theme.bgSecondary} transition-all duration-300 hover:scale-105 flex items-center space-x-2`}>
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`${theme.bgCard} ${theme.border} border rounded-2xl p-6 hover:scale-105 transition-all duration-300`}>
                <div className={`text-3xl md:text-4xl font-bold ${theme.text} mb-2`}>{stat.number}</div>
                <div className={`${theme.textSecondary} font-medium`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 px-6 ${theme.bgSecondary}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-6`}>
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className={`text-xl ${theme.textSecondary} max-w-3xl mx-auto`}>
              Powerful features designed to help developers create, share, and grow their influence in the tech community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`${theme.bgCard} ${theme.border} border rounded-2xl p-8 hover:scale-105 transition-all duration-300 group`}>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${theme.accent} w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${theme.text} mb-4`}>{feature.title}</h3>
                <p className={`${theme.textSecondary} leading-relaxed`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 px-6 ${theme.bg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-6`}>
              Loved by Developers
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Worldwide</span>
            </h2>
            <p className={`text-xl ${theme.textSecondary} max-w-3xl mx-auto`}>
              See what industry leaders are saying about DevMark
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`${theme.bgCard} ${theme.border} border rounded-2xl p-8 hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${theme.accent} flex items-center justify-center text-white font-semibold mr-4`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className={`font-semibold ${theme.text}`}>{testimonial.name}</div>
                    <div className={`text-sm ${theme.textMuted}`}>{testimonial.role}</div>
                  </div>
                </div>
                <p className={`${theme.textSecondary} italic leading-relaxed`}>"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-6 ${theme.bgSecondary} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-6`}>
            Ready to Share Your
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Developer Journey?</span>
          </h2>
          
          <p className={`text-xl ${theme.textSecondary} mb-12 leading-relaxed`}>
            Join thousands of developers who are already building their reputation and growing their network on DevMark.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className={`px-8 py-4 bg-gradient-to-r ${theme.accent} hover:${theme.accentHover} text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-2xl flex items-center space-x-2`}>
              <UserPlus className="h-5 w-5" />
              <span>Create Your Account</span>
            </button>
            
            <button className={`px-8 py-4 ${theme.text} ${theme.textSecondary} hover:${theme.text} transition-colors flex items-center space-x-2`}>
              <BookOpen className="h-5 w-5" />
              <span>Explore Articles</span>
            </button>
          </div>

          <div className={`mt-12 flex justify-center items-center space-x-6 ${theme.textMuted}`}>
            <span>Follow us:</span>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 hover:text-blue-400 cursor-pointer transition-colors" />
              <Github className="h-5 w-5 hover:text-gray-400 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 ${theme.bg} ${theme.border} border-t`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${theme.accent}`}>
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className={`text-xl font-bold ${theme.text}`}>DevMark</span>
              </div>
              <p className={`${theme.textSecondary} leading-relaxed`}>
                The modern publishing platform for developers to share knowledge and grow together.
              </p>
            </div>
            
            <div>
              <h4 className={`font-semibold ${theme.text} mb-4`}>Product</h4>
              <ul className={`space-y-2 ${theme.textSecondary}`}>
                <li><a href="#" className="hover:text-current transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-current transition-colors">API</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold ${theme.text} mb-4`}>Community</h4>
              <ul className={`space-y-2 ${theme.textSecondary}`}>
                <li><a href="#" className="hover:text-current transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-current transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold ${theme.text} mb-4`}>Company</h4>
              <ul className={`space-y-2 ${theme.textSecondary}`}>
                <li><a href="#" className="hover:text-current transition-colors">About</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-current transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 ${theme.border} border-t flex flex-col md:flex-row justify-between items-center`}>
            <p className={`${theme.textMuted} text-sm`}>
              © 2025 DevMark. All rights reserved.
            </p>
            <div className={`flex items-center space-x-4 ${theme.textMuted} text-sm mt-4 md:mt-0`}>
              <span>Made with ❤️ for developers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;