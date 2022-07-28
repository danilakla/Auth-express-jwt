import './App.css';
import Login from './components/login';
import { Route, BrowserRouter } from 'react-router-dom'
import Switch from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Body from './components/Body';

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
    <Router>
      <div className="App">
        <Body />
      </div>
    </Router>
  );
}

export default App;
