import React from 'react';
import { Shield, Code, CheckCircle } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Loader Container */}
      <div className="relative bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full">
        
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4777f4]/10 to-[#9035ea]/10 rounded-2xl opacity-50 animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          
          {/* Logo with Animation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-gradient-to-r from-[#4777f4] to-[#9035ea] w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-white font-mono font-bold text-xl">
                {'<>'}
              </div>
            </div>
          </div>

          {/* Animated Spinner */}
          <div className="relative w-20 h-20">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
            
            {/* Animated Ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-[#4777f4] border-r-[#9035ea] rounded-full animate-spin"></div>
            
            {/* Inner Icon */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full transform scale-75">
              {<Shield className="w-8 h-8 text-white" />}
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {message}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {submessage}
            </p>
          </div>

          {/* Animated Dots */}
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-full animate-pulse"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthLoader;