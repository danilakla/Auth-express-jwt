import './App.css';
import Login from './components/login';
import { gapi } from 'gapi-script'
import { useEffect } from 'react'

const client_id = '543959122831-p0lud62rc95l6daf174aco57fkc2srt9.apps.googleusercontent.com'
function App() {
  // useEffect(() => {
  //   function start() {

  //     gapi.client.init({
  //       clientId: client_id,
  //       scope: ""
  //     })

  //   };
  //   gapi.load('client:auth2', start)
  //   console.log(1);
  // })

  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}

export default App;
