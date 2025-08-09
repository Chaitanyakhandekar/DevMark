import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Test } from './test/Test'
import Signup from './pages/auth/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Signup/>
  )
}

export default App
