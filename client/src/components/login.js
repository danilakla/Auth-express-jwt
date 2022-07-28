import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { gapi } from "gapi-script"


export const API_URL = 'http://localhost:4000/api'
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})
$api.interceptors.request.use((config) => {

  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config
})
$api.interceptors.response.use((config) => {
  return config
}, async (error) => {

  const originalRequest = error.config;
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true

    try {

      const response = await $api.put(`${API_URL}/refresh`, { withCredentials: true })
      console.log(response);
      localStorage.setItem('token', response.data.accessToken)
      return $api.request(originalRequest)
    } catch (error) {
      console.log(error);

    }
  }
})
function Login() {

  const [users, getUsers] = useState('')
  const [name, getName] = useState('')
  const [password, getPssword] = useState('')

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

    const res = await $api.post('/registration', { password, email: name });
    console.log(res);
    localStorage.setItem('token', res.data.accessToken)
  }
  const logout = async () => {
    await $api.delete('/logout', { password, email: name });
    localStorage.removeItem('token')
  }
  const updataToken = async () => {
    const res = await $api.put('/refresh');
    localStorage.setItem('token', res.data.accessToken)
    console.log(res);
  }
  const forgotPassword = async () => {

  }
  const onFailure = async (res) => {
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
          Name:
          <input value={name} type="text" name="name" onChange={(e) => getName(e.target.value)} />
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
        plagin_name=''
      />

      <div ></div>

      <button onClick={forgotPassword}>forgot password</button>
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