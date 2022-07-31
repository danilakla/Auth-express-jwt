import React, { useState } from 'react'

import $api from '../http/axios'

function ForgotPassword() {
  const [helpInfo, setInfo] = useState('')

  const [email, getPssword] = useState('')
  const sendEmail = async (e) => {
    e.preventDefault();
    const res = await $api.post('/forgot-password', { email })
    if (res.data.error) {
      setInfo(res.data.message)

    } else {
      setInfo('check email')

    }
  }

  return (
    <div>
      <form>

        <label >
          email
          <input type="text" name="email" value={email} onChange={(e) => getPssword(e.target.value)} />
        </label>

        <input type="submit" value="Submit" onClick={(e) => sendEmail(e)} />

      </form>

      <h2>{helpInfo}</h2>
    </div >
  )
}


export default ForgotPassword;
