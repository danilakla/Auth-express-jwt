import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { useState } from 'react';


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
const client_id = '543959122831-p0lud62rc95l6daf174aco57fkc2srt9.apps.googleusercontent.com'
function Login() {
  const [users, getUsers] = useState('')
  const [name, getName] = useState('')
  const [password, getPssword] = useState('')

  const onSuccess = async (response) => {

    try {

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
    const res2 = await $api.get('/all');
    console.log(res2);
    getUsers(JSON.stringify(res2.data))

  }


  const onFailure = (res) => {
    console.log(res);
  }

  const onSuccessFacebook = async (response) => {
    console.log(response);
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
        clientId={client_id}
        onSuccess={onSuccess}
        onFailure={onFailure} />
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