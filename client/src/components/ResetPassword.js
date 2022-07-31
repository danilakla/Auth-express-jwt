import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import $api from '../http/axios'

function ResetPassword() {
  const [helpInfo, setInfo] = useState('')

  const [password, getPssword] = useState('')
  const token = useParams()
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await $api.put(`/reset-password/${token.resetToken}`, { password })
      if (res !== undefined) {
        setInfo('Your password has been reset, try again login in account')

      } else {
        setInfo('Invalid password')
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <form>

        <label >
          password
          <input type="text" name="password" value={password} onChange={(e) => getPssword(e.target.value)} />
        </label>

        <input type="submit" value="Submit" onClick={(e) => resetPassword(e)} />

      </form>

      <h2>{helpInfo}</h2>

    </div>
  )
}


export default ResetPassword;
