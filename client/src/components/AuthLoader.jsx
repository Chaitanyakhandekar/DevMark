import React from 'react';
import { Shield, Code, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

const AuthLoader = ({ 
  message = "Authenticating...", 
  submessage = "Verifying your credentials",
  type = "auth" // auth, saving, loading
}) => {
  const getIcon = () => {
    switch(type) {
      case 'auth':
        return <Shield className="w-8 h-8 text-white" />;
      case 'saving':
        return <Code className="w-8 h-8 text-white" />;
      case 'loading':
        return <CheckCircle className="w-8 h-8 text-white" />;
      default:
        return <Shield className="w-8 h-8 text-white" />;
    }
  };

  useEffect(()=>{
    document.documentElement.classList.add("dark")
  },[])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
     {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#111827] to-[#1f2937]">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(71, 119, 244, 0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(71, 119, 244, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Floating Orbs with better blend */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4777f4] rounded-full filter blur-[120px] opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#9035ea] rounded-full filter blur-[120px] opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-[#4777f4] rounded-full filter blur-[100px] opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}></div>
      </div>
      
      {/* Loader Container */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-8 px-4">
        
        {/* Main Logo with Glow Effect */}
        <div className="relative">
          {/* Outer Glow Rings */}
          <div className="absolute inset-0 scale-150">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-ping opacity-20"></div>
          </div>
          <div className="absolute inset-0 scale-125">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-pulse opacity-30"></div>
          </div>
          
          {/* Logo Container */}
          <div className="relative">
            {/* Rotating Border */}
            <div className="absolute -inset-4">
              <div className="w-full h-full bg-gradient-to-r from-[#4777f4] via-[#9035ea] to-[#4777f4] rounded-full animate-spin opacity-75 blur-md" style={{animationDuration: '3s'}}></div>
            </div>
            
            {/* Logo Background */}
            <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 rounded-full border-2 border-white/10 shadow-2xl">
              <div className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <div className="text-white font-mono font-bold text-3xl">
                  {'<>'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hexagonal Spinner */}
        <div className="relative w-32 h-32">
          {/* Multiple Rotating Rings */}
          <div className="absolute inset-0 border-4 border-transparent border-t-[#4777f4] border-r-[#4777f4] rounded-full animate-spin" style={{animationDuration: '1.5s'}}></div>
          <div className="absolute inset-2 border-4 border-transparent border-b-[#9035ea] border-l-[#9035ea] rounded-full animate-spin" style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>
          <div className="absolute inset-4 border-4 border-transparent border-t-[#4777f4] rounded-full animate-spin" style={{animationDuration: '1s'}}></div>
          
          {/* Center Icon with Pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full p-4 animate-pulse shadow-xl">
              {getIcon()}
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          {/* Card Glow */}
          <div className="absolute -inset-px bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-2xl opacity-20 blur"></div>
          
          <div className="relative space-y-6">
            {/* Loading Text */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">
                {message}
              </h3>
              <p className="text-base text-gray-300">
                {submessage}
              </p>
            </div>

            {/* Animated Wave Dots */}
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-bounce shadow-lg"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.3s'}}></div>
              <div className="w-3 h-3 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.4s'}}></div>
            </div>

            {/* Progress Bar with Shimmer */}
            <div className="relative w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-pulse"></div>
            </div>

            {/* Status Indicators */}
            <div className="flex justify-center space-x-4 pt-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Secure Connection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* DevMark Branding */}
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <div className="w-6 h-6 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded flex items-center justify-center text-xs font-bold">
            {'<>'}
          </div>
          <span>DevMark</span>
        </div>
      </div>

      {/* Additional Keyframes for Shimmer Effect */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default AuthLoader;