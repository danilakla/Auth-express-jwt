import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';

import $api from '../http/axios'
function Login() {
  const [helpInfo, setInfo] = useState('')

  const [password, getPssword] = useState('')
  const [email, getName] = useState('')
  const login = async (e) => {
    e.preventDefault();

    const res = await $api.post('/login', { password, email });
    if (res.data.error) {
      setInfo(res.data.message)

    } else {
      setInfo('you enter account')

      localStorage.setItem('token', res.data.accessToken)
    }
  }


  const onSuccess = async (response) => {
    const res = await $api.post('/google-login', { tokenId: response.tokenId });
    localStorage.setItem('token', res.data.accessToken)
    if (res.data.error) {
      setInfo(res.data.message)
    } else {
      setInfo('you enter account')

      localStorage.setItem('token', res.data.accessToken)
    }

  }
  const onFailure = async (res) => {
    console.log(res);
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

          <div></div>        </label>      <Link to="/login/sendEmail">Forgot your password?</Link>

        <h2>{helpInfo}</h2>
        <div></div>

        <input type="submit" value="Submit" onClick={(e) => login(e)} />
      </form>
      <GoogleLogin clientId='77144797068-s64eirkru9foga32she7mnlettoi7361.apps.googleusercontent.com'
        onSuccess={onSuccess}
        onFailure={onFailure} />
      <div ></div>

    </div >
  )
}


export default Login;
