import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './login'
import NewPassword from './NewPassword';

function Body() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/:resetToken" element={<NewPassword />} />

      </Routes>
    </div>
  )
}


export default Body;
