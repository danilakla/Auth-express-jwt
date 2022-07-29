import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EmailSender from './EmailForRestPassword';
import SignIn from './SignIn'
import NewPassword from './NewPassword';
import Login from './Login';

function Body() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<Login />} />

        <Route path="/login/:resetToken" element={<NewPassword />} />
        <Route path="/login/sendEmail" element={<EmailSender />} />

      </Routes>
    </div>
  )
}


export default Body;
