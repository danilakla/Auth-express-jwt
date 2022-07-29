import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useEffect, useState } from 'react';
import { gapi } from "gapi-script"
import $api from '../http/axios'

function SignIn() {

  const [email, getName] = useState('')
  const [password, getPssword] = useState('')
  const [helpInfo, setInfo] = useState('')



  const registration = async (e) => {
    e.preventDefault();

    const res = await $api.post('/registration', { password, email });
    console.log(res);
    setInfo('you enter account')

    localStorage.setItem('token', res.data.accessToken)
  }

  const onSuccess = async (response) => {

    try {
      console.log(response);
      const res = await $api.post('/google_login', { tokenId: response.tokenId });
      console.log();
      localStorage.setItem('token', res.data.token)
      setInfo('you enter account')

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  const onFailure = async (res) => {
    console.log(res);
  }

  return (
    <div id='sighInButton'>
      SIGN IN
      <form>

        <label >
          email:
          <input value={email} type="text" name="email" onChange={(e) => getName(e.target.value)} />
        </label>
        <div></div>
        <label >
          password
          <input type="text" name="password" value={password} onChange={(e) => getPssword(e.target.value)} />
        </label>
        <div></div>

        <input type="submit" value="Submit" onClick={(e) => registration(e)} />
      </form>
      <GoogleLogin
        clientId='77144797068-s64eirkru9foga32she7mnlettoi7361.apps.googleusercontent.com'
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      <br></br>
      <h2>{helpInfo}</h2>

    </div >
  )
}

export default SignIn