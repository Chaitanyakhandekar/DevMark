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

function App() {
  const [count, setCount] = useState(0)

  return (
   
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verify-confirm" element={<VerifyConfirm />} />
        <Route path="/test-loader" element={<TestLoader />} />
      </Routes>
  
  )
}

export default App
