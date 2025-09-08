import React from 'react'

function CreateBlogPage() {
  return (
    <div className="min-w-screen min-h-screen dark:bg-[#111826]">

        {/* Desktop Navbar */}
        <nav className='h-20 border-[0.2px] border-b-gray-600 border-l-0 border-r-0 border-t-0'>
            <div className="h-full flex justify-center items-center gap-2">
          <div className=" h-10 sm:h-12 w-10 sm:w-12 flex justify-center items-center bg-gradient-to-r from-[#4777f4] to-[#9035ea] text-white font-mono font-bold rounded-md">
          {'<>'}
        </div>
        <div className="text-black dark:text-white text-3xl sm:text-3xl font-bold">
          DevMark
        </div>
        </div>
        </nav>

    </div>
  )
}

export default CreateBlogPage