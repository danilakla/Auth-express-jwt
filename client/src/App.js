import './App.css';

import { BrowserRouter as Router } from 'react-router-dom'
import Body from './components/Body';
import NavBar from './components/header/NavBar';

function App() {


  return (
    <Router>
      <div className="App">
        <NavBar />
        <Body />
      </div>
    </Router>
  );
}

export default App;
