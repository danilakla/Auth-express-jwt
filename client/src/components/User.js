import React, { useState } from 'react'
import $api from '../http/axios'
import PayButton from './PayButton'
import margine from './css/margine'
function User() {
  const bdGoods = {
    id: 1,
    name: 'phone',
    price: 200
  }
  const [users, getUsers] = useState('')
  const [helpInfo, setInfo] = useState('')

  //information about user
  const testGetUser = async () => {
    const res = await $api.get('/one');
    if (res.data.error) {
      getUsers(res.data.message)
    } else {
      getUsers(JSON.stringify(res.data))
    }
  }

  const testGetUsers = async () => {
    const res = await $api.get('/all');
    if (res.data.error) {
      getUsers(res.data.message)
    } else {
      getUsers(JSON.stringify(res.data))
    }
  }

  //user capabilities
  const logout = async () => {
    const res = await $api.delete('/logout');
    if (res.data.error) {
      setInfo(res.data.message);
    } else {
      localStorage.removeItem('token')
    }
  }

  const updataToken = async () => {
    const res = await $api.put('/refresh');
    if (res.data.error) {
      setInfo(res.data.message);
    } else {
      localStorage.setItem('token', res.data.accessToken)
      setInfo('Your token has been updated manual method')
    }
  }


  return (
    <div>
      <h1>Authorized user capabilities</h1>

      <button style={margine} onClick={testGetUser}> common User</button>

      <button onClick={testGetUsers}>Admin</button>
      <br></br>

      <button style={margine} onClick={logout}>logout</button>
      <br></br>
      <p style={margine}> {helpInfo}</p>
      <br></br>

      <button onClick={updataToken}>updata token</button> or through the interceptor automatically
      <div ></div>

      < h1 style={margine} >  {users}</h1 >

      <PayButton cartItems={bdGoods} />


    </div >
  )
}


export default User;
