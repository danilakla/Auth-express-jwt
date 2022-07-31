import React, { useState } from 'react'
import $api from '../http/axios'
import PayButton from './PayButton'
import margine from './css/margine'
import { useNavigate } from 'react-router-dom'

function User() {
  const bdGoods = {
    id: 1,
    name: 'phone',
    price: 200
  }

  const navigate = useNavigate()
  const [users, getUsers] = useState('')
  const [helpInfo, setInfo] = useState('')

  //information about user
  const testGetUser = async () => {
    try {
      const res = await $api.get('/user/one');

      getUsers(JSON.stringify(res.data))
    } catch (error) {
      setInfo('You are not log in');
    }


  }

  const testGetUsers = async () => {
    try {
      const res = await $api.get('/user/all');

      getUsers(JSON.stringify(res.data))
    } catch (error) {
      getUsers('')
      setInfo("You aren't Admin")
    }


  }

  //user capabilities
  const logout = async () => {
    await $api.delete('/logout');

    localStorage.removeItem('token')
    navigate('/login')

  }

  const updataToken = async () => {
    const res = await $api.put('/refresh');

    localStorage.setItem('token', res.data.accessToken)
    setInfo('Your token has been updated manual method')

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
