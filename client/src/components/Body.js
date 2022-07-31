import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp'
import ResetPassword from './ResetPassword';
import Login from './login';
import User from './User';
import SuccessPayment from './PaySuccess';
function Body() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userInterface" element={<User />} />
        <Route path="/successPayment" element={< SuccessPayment />} />
        
        <Route path="/login/:resetToken" element={<ResetPassword />} />
        <Route path="/login/sendEmail" element={<ForgotPassword />} />

      </Routes>
    </div>
  )
}


export default Body;
