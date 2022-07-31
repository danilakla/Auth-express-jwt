import React, { useState } from 'react'

import $api from '../http/axios'

function ForgotPassword() {

  const [email, getPssword] = useState('')
  const [helpInfo, setInfo] = useState('')

  const sendEmail = async (e) => {

    try {

      e.preventDefault();

      const res = await $api.post('/forgot-password', { email })
      if (res !== undefined) {
        setInfo('Check email')
      }
      else {
        setInfo('The user with this email address was not found')

      }



    } catch (error) {
      console.log(error);
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
