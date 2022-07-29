import React, { useState } from 'react'
import $api from '../http/axios'

function User() {
  const [users, getUsers] = useState('')
  const [helpInfo, setInfo] = useState('')

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
  const logout = async () => {
    await $api.delete('/logout');
    localStorage.removeItem('token')
  }
  const updataToken = async () => {
    const res = await $api.put('/refresh');
    localStorage.setItem('token', res.data.accessToken)
    setInfo('Your token has been updated manual method')
    console.log(res);
  }
  return (
    <div>

      <button onClick={testGetUser}> common User</button>

      <button onClick={testGetUsers}>Admin</button>
      <br></br>

      <button onClick={logout}>logout</button>
      <br></br>
      {helpInfo}
      <br></br>

      <button onClick={updataToken}>updata token</button> or through the interceptor automatically
      <div ></div>

      < h1 > {users}</h1 >



    </div >
  )
}


export default User;
