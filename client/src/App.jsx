import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Test } from './test/Test'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Verify from './pages/auth/Verify'
import { Router, Routes, Route } from 'react-router-dom'
import Home1 from './pages/public/Home'
import Home from './pages/public/Home1'
import VerifyConfirm from './pages/auth/VerifyConfirm'
import TestLoader from './test/TestLoader'
import BlogEditor from './pages/user/CreateB'
import CreateBlogPage from './pages/user/blogs/CreateBlogPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home1 />} />
      <Route path="/home" element={<Home1 />} />
      <Route path="/create-blog1" element={<BlogEditor />} />
      <Route path="/user/blogs/create" element={<CreateBlogPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:id" element={<Verify />} />
      <Route path="/home1" element={<Home1 />} />
      <Route path="/verify-confirm" element={<VerifyConfirm />} />
        <Route path="/test-loader" element={<TestLoader />} />
      </Routes>
  
  )
}

export default App
