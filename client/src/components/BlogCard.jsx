import React, { useState } from 'react'
import {
    Heart,
    MessageCircle,
    Bookmark,
    Eye,
    Send,
    X
} from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios'
import { commentApi } from '../api/comment.api';

// Mock axios and getTimeAgo for demo


const getTimeAgo = (date) => {
    return "2 days ago";
};

function BlogCard({
    id,
    title,
    description,
    imgUrl,
    tags = ["#react", "#javascript", "#webdev"],
    likes = 0,
    comments = 0,
    views = 0,
    owner = {},
    followStatus = {},
    setFollowStatus = () => {},
    createdAt = new Date(),
    bgColor = "1f2936",
    isOwner = false
}) {
    const [isFollowed, setIsFollowed] = useState(owner.isFollowed);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [commentsList, setCommentsList] = useState([
        {
            id: 1,
            author: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            text: "Great article! Very informative and well-written.",
            time: "1 hour ago",
            likes: 5
        },
        {
            id: 2,
            author: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            text: "Thanks for sharing this. Looking forward to more content like this!",
            time: "3 hours ago",
            likes: 2
        },
        {
            id: 3,
            author: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            text: "Great article! Very informative and well-written.",
            time: "1 hour ago",
            likes: 5
        },
        {
            id: 4,
            author: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            text: "Thanks for sharing this. Looking forward to more content like this!",
            time: "3 hours ago",
            likes: 2
        },
        
    ]);

    const handleFollow = async () => {
        console.log(owner._id);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV}/followers/follow/${owner._id}`,
                {},
                {
                    withCredentials: true
                }
            );

            console.log(res.data);

            setFollowStatus(prev => ({
                ...prev,
                [owner._id]: true
            }));
            setIsFollowed(true);
        } catch (error) {
            console.log("HandleFollow :: Error :: ", error.message);
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            const newComment = {
                id: Date.now(),
                author: "You",
                avatar: owner.avatar,
                text: commentText,
                time: "Just now",
                likes: 0
            };
            setCommentsList([newComment, ...commentsList]);
            setCommentText('');
        }
    };

    const handleCommentsFetch = async ()=>{
        setShowComments(!showComments)
        try {
            const res = await commentApi.getBlogComments(id)
        } catch (error) {
            console.log("Fetch Comments :: ERROR :: ",error.message)
        }
    }

   

    const shouldShowReadMore = description && description.length > 150;

    return (
        <div className={`w-full md:w-full bg-white dark:bg-[#${bgColor}] md:rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 md:dark:border dark:border-gray-700 overflow-hidden mt-3`}>
            {/* Image Section */}
            <div className="w-full relative group rounded-md">
                <div className="w-full flex justify-center overflow-hidden rounded-md">
                    <img
                        className='w-full h-[280px] object-cover transition-transform duration-300 group-hover:scale-105 p-2 rounded-md'
                        src={imgUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop"}
                        alt={title}
                    />
                </div>
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm absolute top-4 right-4 rounded-lg text-white text-sm font-medium">
                    8 min read
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full flex flex-col gap-4 p-5 text-black dark:text-white">
                {/* Author Info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full flex-shrink-0 overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
                            <img
                                className='w-full h-full object-cover'
                                src={owner.avatar}
                                alt={owner.username}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <div className="flex items-center gap-1.5 font-semibold text-sm">
                                <span className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                                    {owner.username}
                                </span>
                                <svg className="w-4 h-4 text-white bg-blue-600 rounded-full flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                {getTimeAgo(createdAt)} · {owner.totalFollowers} followers
                            </p>
                        </div>
                    </div>

                    {!isOwner && (
                        <button
                            disabled={followStatus[owner._id]}
                            onClick={handleFollow}
                            className={`text-sm font-medium cursor-pointer px-4 py-1.5 rounded-md transition-all duration-200 ${
                                followStatus[owner._id]
                                    ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-default"
                                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow"
                            }`}
                        >
                            {followStatus[owner._id] ? "Following" : "Follow"}
                        </button>
                    )}
                </div>

                {/* Title */}
                <h2 className='text-xl md:text-2xl font-bold leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer line-clamp-2'>
                    {title}
                </h2>

                {/* Description */}
                <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    <p className={!isExpanded && shouldShowReadMore ? "line-clamp-3" : ""}>
                        {description}
                    </p>
                    {shouldShowReadMore && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mt-1 transition-colors"
                        >
                            {isExpanded ? "show less" : "read more"}
                        </button>
                    )}
                </div>

                {/* Tags */}
                <div className="flex items-center flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <button
                            key={index}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
                        >
                            #{tag}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group">
                            <Heart size={18} className='group-hover:fill-current' />
                            <span className="text-sm font-medium">{likes}</span>
                        </button>
                        <button 
                            onClick={() => {
                                handleCommentsFetch()
                            }}
                            className={`flex items-center gap-1.5 transition-colors ${
                                showComments 
                                    ? 'text-blue-500 dark:text-blue-400' 
                                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                            }`}
                        >
                            <MessageCircle size={18} />
                            <span className="text-sm font-medium">{comments}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors group">
                            <Bookmark size={18} className='group-hover:fill-current' />
                        </button>
                    </div>

                    <div className="flex text-gray-500 dark:text-gray-400 items-center gap-1.5">
                        <Eye size={18} />
                        <span className="text-sm font-medium">{views}</span>
                    </div>
                </div>

                {/* Comments Section */}
                {showComments && (
                    <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-4 animate-in slide-in-from-top duration-300">
                        {/* Comments Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Comments ({commentsList.length})</h3>
                            <button
                                onClick={() => setShowComments(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Comment Input */}
                        <form onSubmit={handleCommentSubmit} className="mb-4">
                            <div className="flex gap-3">
                                <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-700">
                                    <img
                                        className='w-full h-full object-cover'
                                        src={owner.avatar}
                                        alt="Your avatar"
                                    />
                                </div>
                                <div className="flex-1 flex gap-2">
                                    <input
                                        type="text"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!commentText.trim()}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {commentsList.map((comment) => (
                                <div key={comment.id} className="flex gap-3">
                                    <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-700">
                                        <img
                                            className='w-full h-full object-cover'
                                            src={comment.avatar}
                                            alt={comment.author}
                                        />
                                    </div>
                                    <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold text-sm">{comment.author}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{comment.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{comment.text}</p>
                                        <div className="flex items-center gap-3">
                                            <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors text-xs">
                                                <Heart size={14} />
                                                {comment.likes > 0 && <span>{comment.likes}</span>}
                                            </button>
                                            <button className="text-xs text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors font-medium">
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4B5563;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #6B7280;
                }
                @keyframes slide-in-from-top {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-in {
                    animation: slide-in-from-top 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}

// Demo
export default BlogCard