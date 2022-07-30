import React, { useState } from 'react'
import $api from '../http/axios'
import PayButton from './PayButton'
function User() {
  const bdGoods = {
    id: 1,
    name: 'phone',
    price: 200
  }
  const [users, getUsers] = useState('')
  const [helpInfo, setInfo] = useState('')

  const testGetUser = async () => {
    const res2 = await $api.get('/one');
    getUsers(JSON.stringify(res2.data))

  }
  const testGetUsers = async () => {
    const res1 = await $api.get('/all');
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <PayButton cartItems={bdGoods} />


    </div >
  )
}


export default User;
