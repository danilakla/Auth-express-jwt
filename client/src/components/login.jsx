import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { useState } from 'react';
import FacebookLogin from 'react-facebook-login';


export const API_URL = 'http://localhost:4000/api'
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})
$api.interceptors.request.use((config) => {

  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config
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
      <button onClick={logout}>logout</button>
      <GoogleLogin
        clientId={client_id}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />

      <button onClick={testGetUser}>User</button>
      <button onClick={testGetUsers}>Admin</button>

      <h1>{users}</h1>
    </div>
  )
}

export default Login