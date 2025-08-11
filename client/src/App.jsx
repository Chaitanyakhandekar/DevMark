import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Test } from './test/Test'
import Signup from './pages/auth/Signup'
import { Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
   
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
  
  )
}

export default App
