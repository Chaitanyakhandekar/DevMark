import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Test } from './test/Test'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Verify from './pages/auth/Verify'
import { Router, Routes, Route } from 'react-router-dom'
import Home from './pages/public/Home'
import VerifyConfirm from './pages/auth/VerifyConfirm'
import TestLoader from './test/TestLoader'
import CreateBlogPage from './pages/user/blogs/CreateBlogPage'
import ProtectedRoute from './components/ProtectedRoute'
import AuthLoaderDemo from './components/AuthLoader'
import MainFeed from './pages/user/feed/MainFeed'
import MainFeed1 from './pages/user/feed/MainFeed1'
import ProfilePage1 from './pages/user/profile/Profile'
import ProfilePage from './pages/user/profile/ProfilePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/loader" element={<AuthLoaderDemo />} />

      <Route path="/user/blogs/create" element={<ProtectedRoute><CreateBlogPage/></ProtectedRoute>} />
      <Route path="/user/feed1" element={<ProtectedRoute><MainFeed1/></ProtectedRoute>} />
      <Route path="/user/feed" element={<ProtectedRoute><MainFeed/></ProtectedRoute>} />
      <Route path="/user/profile-1/" element={<ProtectedRoute><ProfilePage1/></ProtectedRoute>} />
      <Route path="/user/profile/" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />


      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:id" element={<Verify />} />
      <Route path="/home1" element={<Home />} />
      <Route path="/verify-confirm" element={<VerifyConfirm />} />
      <Route path="/test-loader" element={<TestLoader />} />
      </Routes>
  
  )
}

export default App