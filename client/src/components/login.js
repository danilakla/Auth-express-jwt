import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom'

import $api from '../http/axios'
function Login() {

  const [password, getPssword] = useState('')
  const [email, getName] = useState('')
  const [errorInfo, setInfo] = useState('');

  const navigate = useNavigate();

  const login = async (e) => {
    try {
      e.preventDefault();

      const res = await $api.post('/login', { password, email });
      localStorage.setItem('token', res.data.accessToken)
      navigate('/userInterface')

    } catch (error) {
      setInfo('A user already exist or Invalid data');

    }

  }


  const onSuccess = async (response) => {

    try {

      const res = await $api.post('/google-login', { tokenId: response.tokenId });
      localStorage.setItem('token', res.data.accessToken)
      navigate('/userInterface')

    } catch (error) {
      setInfo('A user already exist or Invalid data');

    }


  }
  const onFailure = async (res) => {
    console.log(res);
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <form>

        <label >
          email:
          <input value={email} type="text" name="email" onChange={(e) => getName(e.target.value)} />
        </label>

        <div></div>

        <label >
          password
          <input type="text" name="password" value={password} onChange={(e) => getPssword(e.target.value)} />

          <div></div>

        </label><Link to="/login/sendEmail">Forgot your password?</Link>

        <div></div>

        <input type="submit" value="Submit" onClick={(e) => login(e)} />
      </form>
      <GoogleLogin clientId='77144797068-s64eirkru9foga32she7mnlettoi7361.apps.googleusercontent.com'
        onSuccess={onSuccess}
        onFailure={onFailure} />
      <h2 >{errorInfo}</h2>
      <p>If your account is login on the website, you will be redirected to the interface (there you can get a user, as well as pay for the purchase)</p>

    </div >
  )
}


export default Login;
