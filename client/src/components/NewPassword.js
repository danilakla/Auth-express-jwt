import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import $api from '../http/axios'

function NewPassword() {
  const [helpInfo, setInfo] = useState('')

  const [password, getPssword] = useState('')
  const token = useParams()
  const resetPassword = async (e) => {
    e.preventDefault();
    const res = await $api.put(`/passwordReset/${token.resetToken}`, { password })
    if (res.data.error) {
      setInfo(res.data.message)

    } else {
      setInfo('Your password has been reset, try again login in account')

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


export default NewPassword;
