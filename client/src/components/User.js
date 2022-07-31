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
    if (res2.data.error) {
      getUsers(res2.data.message)
    } else {
      getUsers(JSON.stringify(res2.data))

    }

  }
  const testGetUsers = async () => {
    const res1 = await $api.get('/all');
    if (res1.data.error) {
      getUsers(res1.data.message)
    } else {
      getUsers(JSON.stringify(res1.data))

    }

  }
  const logout = async () => {
    const res = await $api.delete('/logout');
    if (res.data.error) {
      setInfo('You are not authorized');
    } else {
      localStorage.removeItem('token')

    }
  }
  const updataToken = async () => {
    const res = await $api.put('/refresh');
    if (res.data.error) {
      setInfo('You are not authorized');
    } else {
      localStorage.setItem('token', res.data.accessToken)
      setInfo('Your token has been updated manual method')
    }
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
