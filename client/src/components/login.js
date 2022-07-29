import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useEffect, useState } from 'react';
import { gapi } from "gapi-script"
import { Link } from 'react-router-dom'
import $api from '../http/axios'

function Login() {

  const [users, getUsers] = useState('')
  const [email, getName] = useState('')
  const [password, getPssword] = useState('')

  const testGetUser = async () => {
    const res2 = await $api.get('/one');
    console.log(res2);
    getUsers(JSON.stringify(res2.data))

  }
  const testGetUsers = async () => {
    console.log('all');
    const res1 = await $api.get('/all');
    console.log(res1);
    getUsers(JSON.stringify(res1.data))

  }

  const registration = async (e) => {
    e.preventDefault();

    const res = await $api.post('/registration', { password, email });
    console.log(res);
    localStorage.setItem('token', res.data.accessToken)
  }

  const onSuccess = async (response) => {

    try {
      console.log(response);
      const res = await $api.post('/google_login', { tokenId: response.tokenId });
      console.log();
      localStorage.setItem('token', res.data.token)

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  const onFailure = async (res) => {
    console.log(res);
  }


  const logout = async () => {
    await $api.delete('/logout');
    localStorage.removeItem('token')
  }
  const updataToken = async () => {
    const res = await $api.put('/refresh');
    localStorage.setItem('token', res.data.accessToken)
    console.log(res);
  }



  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '77144797068-s64eirkru9foga32she7mnlettoi7361.apps.googleusercontent.com',
        scope: ['email', 'name']
      });
    }

    gapi.load('client:auth2', start);
  }, []);



  return (
    <div id='sighInButton'>
      <form>

        <label >
          email:
          <input value={email} type="text" name="email" onChange={(e) => getName(e.target.value)} />
        </label>
        <label >
          password
          <input type="text" name="password" value={password} onChange={(e) => getPssword(e.target.value)} />
        </label>
        <input type="submit" value="Submit" onClick={(e) => registration(e)} />
      </form>
      <GoogleLogin
        clientId='77144797068-s64eirkru9foga32she7mnlettoi7361.apps.googleusercontent.com'
        onSuccess={onSuccess}
        onFailure={onFailure}
      />

      <div ></div>

      <Link to="/login/sendEmail">Forgot your password?</Link>
      <div ></div>

      <button onClick={logout}>logout</button>
      <div ></div>


      <button onClick={testGetUser}>User</button>
      <button onClick={testGetUsers}>Admin</button>
      <div ></div>
      <button onClick={updataToken}>updata token</button>
      or through the interceptor automatically
      < h1 > {users}</h1 >
    </div >
  )
}

export default Login