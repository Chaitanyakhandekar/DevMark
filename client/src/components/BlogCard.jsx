import React from 'react'


function BlogCard() {
        return (
            <div className="w-full bg-[#1f2936] ">
                <div className="w-full">
                    <img
                        className='max-h-[180px] max-w-[1000px] w-full fit-cover'
                        src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop" alt="" />
                </div>

                <div className="w-full">

                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-r from-[#4e76ef] to-[#8e3de6] rounded-[50%] flex justify-center items-center font-bold">SC</div>
                        <div className=''>
                            <div className="flex items-center gap-2 font-bold">
                                Sarah Chen
                                <svg className="w-4 h-4 rounded-[50%] text-white bg-blue-600 " fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className='text-sm text-gray-500'>2h ago . 12,500 followers</p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

export default BlogCard