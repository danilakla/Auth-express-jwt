import { GoogleLogin } from 'react-google-login';
import { useState } from 'react';
import { gapi } from "gapi-script"
import $api from '../http/axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {

  const [email, getName] = useState('');
  const [password, getPssword] = useState('');
  const [errorInfo, setInfo] = useState('');
  const navigate = useNavigate();


  const registration = async (e) => {

    try {
      e.preventDefault();

      const res = await $api.post('/registration', { password, email });
      if (res !== undefined) {
        console.log(res);

        localStorage.setItem('token', res.data.accessToken)

        navigate('/userInterface')
      } else {
        setInfo('A user already exist or Invalid data');

      }


    } catch (error) {
      console.log(error);

    }


  }

  const onSuccess = async (response) => {
    try {
      const res = await $api.post('/google-registration', { tokenId: response.tokenId });//
      if (res !== undefined) {
        localStorage.setItem('token', res.data.accessToken)
        navigate('/userInterface')
      } else {
        setInfo('A user already exist or Invalid data');

      }

    } catch (error) {
      console.log(error);
    }




  }


  return (
    <div id='sighInButton'>
      <h1>SIGN UP</h1>

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

      <GoogleLogin clientId='77144797068-s64eirkru9foga32she7mnlettoi7361.apps.googleusercontent.com'
        onSuccess={onSuccess} >
        Sign up with Google
      </GoogleLogin>
      <h2>{errorInfo}</h2>
      <p>If your account is registered on the website, you will be redirected to the interface (there you can get a user, as well as pay for the purchase)</p>

    </div >
  )
}

export default SignUp