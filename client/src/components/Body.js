import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EmailSender from './EmailForRestPassword';
import Login from './login'
import NewPassword from './NewPassword';

function Body() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/:resetToken" element={<NewPassword />} />
        <Route path="/login/sendEmail" element={<EmailSender />} />

      </Routes>
    </div>
  )
}


export default Body;
