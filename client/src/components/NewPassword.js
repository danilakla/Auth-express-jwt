import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import $api from '../http/axios'

function NewPassword() {
  const [password, getPssword] = useState('')
  const token = useParams()
  const resetPassword = async (e) => {
    e.preventDefault();
    const response = await $api.put('/passwordReset/:resetToken', { password, tokenRes: token.resetToken })
    console.log(response);
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
    </div>
  )
}


export default NewPassword;
