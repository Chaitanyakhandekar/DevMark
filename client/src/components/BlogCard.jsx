import React, { useState } from 'react'
import {
    Heart,
    MessageCircle,
    Bookmark,
    Eye
} from 'lucide-react';

// Mock axios and getTimeAgo for demo
const axios = {
    post: async (url, data, config) => {
        return { data: { success: true } }
    }
};

const getTimeAgo = (date) => {
    return "2 days ago";
};

function BlogCard({
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

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength);
    };

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
                        <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
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
            </div>
        </div>
    );
}

// Demo
export default BlogCard