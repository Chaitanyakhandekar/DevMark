import React, { useState, useRef, useEffect } from 'react';
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

const BlogCreationPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [category, setCategory] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [publishStatus, setPublishStatus] = useState('draft'); // draft, published, private
  const [showSettings, setShowSettings] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isDark, setIsDark] = useState(true);
  
  const textareaRef = useRef(null);

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

  const insertMarkdown = (before, after = '', placeholder = '') => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = selectedText || placeholder;
    const newContent = content.substring(0, start) + before + replacement + after + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + replacement.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [isDark]);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  const renderMarkdown = (text) => {
    return text
      .replace(/^# (.*)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*)/gm, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*)/gm, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/```(.*?)```/gs, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="text-sm font-mono">$1</code></pre>')
      .replace(/^\> (.*)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400">$1</blockquote>')
      .replace(/^\* (.*)/gm, '<li class="ml-4">$1</li>')
      .replace(/^- (.*)/gm, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.*)/gm, '<li class="ml-4">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:underline">$1</a>')
      .replace(/\n/g, '<br>');
  };

  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className={`min-h-screen bg-white dark:bg-[#111827] transition-colors duration-300`}>
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#4777f4] to-[#9035ea] rounded-md flex items-center justify-center text-white text-sm font-bold">
                  {'<>'}
                </div>
                <span className="text-xl font-bold text-gray-800 dark:text-white">DevMark</span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock size={14} />
                <span>{wordCount} words • {readingTime} min read</span>
              </div>
              
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {showPreview ? <EyeOff size={20} className="text-gray-600 dark:text-gray-300" /> : <Eye size={20} className="text-gray-600 dark:text-gray-300" />}
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings size={20} className="text-gray-600 dark:text-gray-300" />
              </button>

              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Title Input */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  placeholder="Enter your blog title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-3xl font-bold bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-white resize-none"
                />
              </div>

              {/* Toolbar */}
              <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#374151]">
                <div className="flex items-center space-x-1 flex-wrap gap-2">
                  <button
                    onClick={() => insertMarkdown('# ', '', 'Heading 1')}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="H1"
                  >
                    <Heading1 size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('## ', '', 'Heading 2')}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="H2"
                  >
                    <Heading2 size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('### ', '', 'Heading 3')}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="H3"
                  >
                    <Heading3 size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                  
                  <button
                    onClick={() => insertMarkdown('**', '**', 'bold text')}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Bold"
                  >
                    <Bold size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('*', '*', 'italic text')}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Italic"
                  >
                    <Italic size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('`', '`', 'code')}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Inline Code"
                  >
                    <Code size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                  
                  <button
                    onClick={() => insertMarkdown('- ', '', 'List item')}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Bullet List"
                  >
                    <List size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('1. ', '', 'List item')}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Numbered List"
                  >
                    <ListOrdered size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('> ', '', 'Quote')}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Quote"
                  >
                    <Quote size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                  
                  <button
                    onClick={() => insertMarkdown('[', '](url)', 'link text')}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Link"
                  >
                    <Link2 size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('![', '](image-url)', 'alt text')}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Image"
                  >
                    <Image size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Editor/Preview Area */}
              <div className="flex h-[600px]">
                {/* Editor */}
                <div className={`${showPreview ? 'w-1/2 border-r border-gray-200 dark:border-gray-700' : 'w-full'} relative`}>
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your amazing blog post..."
                    className="w-full h-full p-6 bg-transparent border-none outline-none resize-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-mono text-sm leading-relaxed"
                    style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace' }}
                  />
                </div>

                {/* Preview */}
                {showPreview && (
                  <div className="w-1/2 p-6 bg-gray-50 dark:bg-[#374151] overflow-y-auto">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      {title && <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h1>}
                      <div 
                        className="text-gray-700 dark:text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Publish Settings */}
              <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Publish Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                    <select
                      value={publishStatus}
                      onChange={(e) => setPublishStatus(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#374151] text-gray-800 dark:text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#374151] text-gray-800 dark:text-white"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Tags</h3>
                
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add tag..."
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#374151] text-gray-800 dark:text-white text-sm"
                      maxLength={20}
                    />
                    <button
                      onClick={addTag}
                      disabled={!newTag.trim() || tags.length >= 5}
                      className="p-2 bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                      >
                        <Tag size={12} />
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {tags.length}/5 tags used
                  </p>
                </div>
              </div>

              {/* SEO Settings */}
              {showSettings && (
                <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">SEO & Social</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Excerpt</label>
                      <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Brief description of your post..."
                        rows={3}
                        maxLength={160}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#374151] text-gray-800 dark:text-white text-sm"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {excerpt.length}/160 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image URL</label>
                      <input
                        type="url"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#374151] text-gray-800 dark:text-white text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Statistics */}
              <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Statistics</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Words:</span>
                    <span className="text-gray-800 dark:text-white font-medium">{wordCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Characters:</span>
                    <span className="text-gray-800 dark:text-white font-medium">{content.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Reading time:</span>
                    <span className="text-gray-800 dark:text-white font-medium">{readingTime} min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreationPage;