import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import $api from '../http/axios'

function Login() {
  const [password, getPssword] = useState('')
  const [email, getName] = useState('')
  const login = async (e) => {
    e.preventDefault();

    const res = await $api.post('/login', { password, email });
    console.log(res);
    localStorage.setItem('token', res.data.accessToken)
  }
  return (
    <div>
      LOGIN
      <form>

        <label >
          email:
          <input value={email} type="text" name="email" onChange={(e) => getName(e.target.value)} />
        </label>
        <div></div>
        <label >
          password
          <input type="text" name="password" value={password} onChange={(e) => getPssword(e.target.value)} />
        </label>
        <div></div>

        <input type="submit" value="Submit" onClick={(e) => login(e)} />
      </form>

      <Link to="/login/sendEmail">Forgot your password?</Link>
      <div ></div>
      <Link to="/">Back to sign in</Link>

    </div >
  )
}


export default Login;
