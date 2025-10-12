import React, { useState, useEffect } from 'react';
import {
    Search,
    Bell,
    BookOpen,
    Bookmark,
    User,
    Settings,
    LogOut,
    Home,
    Edit3,
    Heart,
    MessageCircle,
    Share2,
    Eye,
    TrendingUp,
    Calendar,
    Filter,
    Moon,
    Sun,
    Menu,
    X,
    ChevronDown,
    Code,
    Zap,
    Coffee,
    Briefcase,
    Github,
    ExternalLink,
    Clock,
    Users,
    Tag,
    Plus,
    Star,
    MapPin,

    Mail,
    MoreHorizontal,
    Edit,
    Trash2,
    Grid,
    List,
    Activity,
    Check,
    Camera,
    Upload,
    Save,
    Lock,
    Shield,
    Palette,
    Globe,
    AlertCircle
} from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

function ProfilePage() {
    const [activeTab, setActiveTab] = useState("posts");
    const [userPosts, setUserPosts] = useState([]);
    const [userAvatar, setUserAvatar] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop");
    const [bio, setBio] = useState("Full Stack Developer | Open Source Enthusiast | Building scalable web applications with React, Node.js, and TypeScript");
    const [editBio, setEditBio] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [editMode, setEditMode] = useState(false);
    
    // Edit profile states
    const [profileData, setProfileData] = useState({
        name: "Byte Coder",
        username: "@byte_coder",
        location: "San Francisco, CA",
        website: "https://bytecoder.dev",
        githubUrl: "https://github.com/bytecoder",
        twitterUrl: "https://twitter.com/bytecoder",
        linkedinUrl: "https://linkedin.com/in/bytecoder"
    });

    const skills = ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Docker", "AWS"];

    const handleTabChange = (e) => {
        setActiveTab(e.target.name);
    };

    const handleSaveProfile = () => {
        setEditMode(false);
        setEditBio(false);
        // API call would go here
        console.log("Profile saved:", profileData);
    };

    const handleLogout = () => {
        // Logout logic here
        console.log("Logging out...");
    };

    // Mock posts data for demo
    useEffect(() => {
        setUserPosts([
            {
                _id: "1",
                title: "Building Scalable Microservices with Node.js",
                content: "Learn how to architect and deploy production-ready microservices...",
                images: [{ url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop" }],
                totalLikes: 342,
                totalComments: 45,
                views: 2341,
                tags: ["Node.js", "Microservices", "Architecture"],
                owner: { name: "Byte Coder", avatar: userAvatar },
                createdAt: new Date().toISOString()
            },
            {
                _id: "2",
                title: "Modern React Patterns You Should Know",
                content: "Exploring the latest patterns and best practices in React development...",
                images: [{ url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop" }],
                totalLikes: 521,
                totalComments: 67,
                views: 3892,
                tags: ["React", "JavaScript", "Frontend"],
                owner: { name: "Byte Coder", avatar: userAvatar },
                createdAt: new Date().toISOString()
            }
        ]);
    }, []);

    return (
        <div className='w-screen min-h-screen bg-[#0f172a] flex flex-col pb-20'>
            {/* Cover Photo with Edit Button */}
            <section className="w-[95%] md:w-[70%] lg:w-[60%] xl:w-[65%] mx-auto mt-6 rounded-2xl overflow-hidden relative group">
                <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop"
                    alt="Cover"
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                {editMode && (
                    <button className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black/80 transition-all">
                        <Camera size={18} />
                        <span className="text-sm font-medium">Change Cover</span>
                    </button>
                )}
            </section>

            {/* User Info Card */}
            <section className="w-[95%] md:w-[70%] lg:w-[60%] xl:w-[65%] mx-auto -mt-16 rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#1e293b]/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                
                {/* Header with Avatar and Actions */}
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        
                        {/* Avatar Section */}
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start flex-1">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-xl relative">
                                    <img 
                                        src={userAvatar}
                                        alt="Profile"
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                                    />
                                    {editMode && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera size={24} className="text-white" />
                                        </div>
                                    )}
                                </div>
                                {!editMode && (
                                    <button className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 p-2.5 rounded-xl text-white shadow-lg hover:shadow-xl transition-all hover:scale-110">
                                        <ExternalLink size={18} />
                                    </button>
                                )}
                            </div>

                            {/* Name and Bio Section */}
                            <div className="flex-1 w-full text-center md:text-left">
                                {editMode ? (
                                    <input
                                        className="text-2xl md:text-3xl font-bold text-white mb-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none w-full"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                    />
                                ) : (
                                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{profileData.name}</h1>
                                )}
                                
                                {editMode ? (
                                    <input
                                        className="text-base text-slate-400 mb-4 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none w-full"
                                        value={profileData.username}
                                        onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                                    />
                                ) : (
                                    <p className="text-base text-slate-400 mb-4">{profileData.username}</p>
                                )}

                                {editMode ? (
                                    <textarea
                                        className="text-base text-slate-300 leading-relaxed bg-slate-800/50 px-4 py-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none w-full resize-none"
                                        rows="3"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Tell us about yourself..."
                                    />
                                ) : (
                                    <p className="text-base text-slate-300 leading-relaxed mb-4">{bio}</p>
                                )}

                                {/* Location and Join Date */}
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <MapPin size={16} className="text-blue-400" />
                                        {editMode ? (
                                            <input
                                                className="text-sm bg-slate-800/50 px-3 py-1 rounded-md border border-slate-600 focus:border-blue-500 focus:outline-none"
                                                value={profileData.location}
                                                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                            />
                                        ) : (
                                            <span className="text-sm">{profileData.location}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Calendar size={16} className="text-purple-400" />
                                        <span className="text-sm">Joined January 2020</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Globe size={16} className="text-green-400" />
                                        <a href={profileData.website} className="text-sm hover:text-blue-400 transition-colors">bytecoder.dev</a>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                                    <a href={profileData.githubUrl} className="text-slate-400 hover:text-white transition-all hover:scale-110">
                                        <FaGithub size={22} />
                                    </a>
                                    <a href={profileData.twitterUrl} className="text-slate-400 hover:text-blue-400 transition-all hover:scale-110">
                                        <FaTwitter size={22} />
                                    </a>
                                    <a href={profileData.linkedinUrl} className="text-slate-400 hover:text-blue-500 transition-all hover:scale-110">
                                        <FaLinkedin size={22} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            {editMode ? (
                                <>
                                    <button 
                                        onClick={handleSaveProfile}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <Check size={20} />
                                        Save Changes
                                    </button>
                                    <button 
                                        onClick={() => setEditMode(false)}
                                        className="bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        <X size={20} />
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => setEditMode(true)}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <Edit3 size={20} />
                                        Edit Profile
                                    </button>
                                    <div className="relative">
                                        <button 
                                            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                                            className="w-full bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Settings size={20} />
                                            Settings
                                        </button>
                                        
                                        {/* Settings Dropdown */}
                                        {showSettingsMenu && (
                                            <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden z-50">
                                                <div className="p-2">
                                                    <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-3 group">
                                                        <Settings size={18} className="text-blue-400" />
                                                        <span className="font-medium">Account Settings</span>
                                                    </button>
                                                    <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-3 group">
                                                        <Lock size={18} className="text-purple-400" />
                                                        <span className="font-medium">Privacy & Security</span>
                                                    </button>
                                                    <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-3 group">
                                                        <Bell size={18} className="text-green-400" />
                                                        <span className="font-medium">Notifications</span>
                                                    </button>
                                                    <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-3 group">
                                                        <Palette size={18} className="text-pink-400" />
                                                        <span className="font-medium">Appearance</span>
                                                    </button>
                                                    <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-3 group">
                                                        <Shield size={18} className="text-yellow-400" />
                                                        <span className="font-medium">Blocked Users</span>
                                                    </button>
                                                    <div className="border-t border-slate-700 my-2"></div>
                                                    <button 
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-3 group"
                                                    >
                                                        <LogOut size={18} />
                                                        <span className="font-medium">Logout</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Skills & Expertise</h2>
                            {editMode && (
                                <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                                    <Plus size={16} />
                                    Add Skill
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span 
                                    key={index} 
                                    className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-300 text-sm px-4 py-2 rounded-full font-medium hover:scale-105 transition-transform cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-700">
                        <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl border border-blue-500/20 hover:scale-105 transition-transform cursor-pointer">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <BookOpen size={20} className='text-blue-400' />
                                <p className='text-2xl font-bold text-white'>120</p>
                            </div>
                            <p className="text-sm text-slate-400 font-medium">Posts</p>
                        </div>

                        <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl border border-purple-500/20 hover:scale-105 transition-transform cursor-pointer">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Users size={20} className='text-purple-400' />
                                <p className='text-2xl font-bold text-white'>5.2K</p>
                            </div>
                            <p className="text-sm text-slate-400 font-medium">Followers</p>
                        </div>

                        <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl border border-green-500/20 hover:scale-105 transition-transform cursor-pointer">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <User size={20} className='text-green-400' />
                                <p className='text-2xl font-bold text-white'>300</p>
                            </div>
                            <p className="text-sm text-slate-400 font-medium">Following</p>
                        </div>

                        <div className="text-center p-4 bg-gradient-to-br from-pink-500/10 to-transparent rounded-xl border border-pink-500/20 hover:scale-105 transition-transform cursor-pointer">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Bookmark size={20} className='text-pink-400' />
                                <p className='text-2xl font-bold text-white'>151</p>
                            </div>
                            <p className="text-sm text-slate-400 font-medium">Saved</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Tabs Section */}
            <section className="w-[95%] md:w-[70%] lg:w-[60%] xl:w-[65%] mx-auto mt-6 rounded-2xl bg-[#1e293b] border border-slate-700/50 overflow-hidden">
                
                {/* Tabs */}
                <div className="flex justify-start items-center border-b border-slate-700">
                    <button
                        className={`text-base font-semibold px-6 py-4 transition-all ${
                            activeTab === "posts" 
                                ? "text-blue-400 border-b-2 border-blue-400 bg-blue-500/5" 
                                : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
                        }`}
                        name="posts"
                        onClick={handleTabChange}
                    >
                        <div className="flex items-center gap-2">
                            <BookOpen size={18} />
                            Posts
                        </div>
                    </button>

                    <button
                        className={`text-base font-semibold px-6 py-4 transition-all ${
                            activeTab === "saved" 
                                ? "text-purple-400 border-b-2 border-purple-400 bg-purple-500/5" 
                                : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
                        }`}
                        name="saved"
                        onClick={handleTabChange}
                    >
                        <div className="flex items-center gap-2">
                            <Bookmark size={18} />
                            Saved
                        </div>
                    </button>

                    <button
                        className={`text-base font-semibold px-6 py-4 transition-all ${
                            activeTab === "drafts" 
                                ? "text-green-400 border-b-2 border-green-400 bg-green-500/5" 
                                : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
                        }`}
                        name="drafts"
                        onClick={handleTabChange}
                    >
                        <div className="flex items-center gap-2">
                            <Edit size={18} />
                            Drafts
                        </div>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {activeTab === "posts" && (
                        <div className="space-y-4">
                            {userPosts.map((post) => (
                                <div key={post._id} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all group">
                                    <div className="flex flex-col md:flex-row">
                                        {post.images?.[0] && (
                                            <div className="md:w-48 h-48 overflow-hidden">
                                                <img 
                                                    src={post.images[0].url} 
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 p-6">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                                            <p className="text-slate-400 mb-4 line-clamp-2">{post.content}</p>
                                            
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.map((tag, idx) => (
                                                    <span key={idx} className="text-xs bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full border border-blue-500/20">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-6 text-sm text-slate-400">
                                                <div className="flex items-center gap-2">
                                                    <Heart size={16} className="text-red-400" />
                                                    <span>{post.totalLikes}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MessageCircle size={16} className="text-blue-400" />
                                                    <span>{post.totalComments}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Eye size={16} className="text-purple-400" />
                                                    <span>{post.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "saved" && (
                        <div className="text-center py-16">
                            <Bookmark size={48} className="text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-300 mb-2">No saved posts yet</h3>
                            <p className="text-slate-500">Posts you save will appear here</p>
                        </div>
                    )}

                    {activeTab === "drafts" && (
                        <div className="text-center py-16">
                            <Edit size={48} className="text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-300 mb-2">No drafts yet</h3>
                            <p className="text-slate-500">Your draft posts will appear here</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ProfilePage;