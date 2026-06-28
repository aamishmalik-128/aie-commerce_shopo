import React from 'react'
import { Route, Routes } from 'react-router'
import Registration from './pages/Registration'
import LogIn from './pages/LogIn'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signup" element={<Registration />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </div>
  )
}

export default App