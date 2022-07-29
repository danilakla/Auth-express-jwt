import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import $api from '../http/axios'

function EmailSender() {
  const [helpInfo, setInfo] = useState('')

  const [email, getPssword] = useState('')
  const sendEmail = async (e) => {
    e.preventDefault();
    const res = await $api.post('/forgotPassword', { email })
    setInfo('check email')
    console.log(res);
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


export default EmailSender;
