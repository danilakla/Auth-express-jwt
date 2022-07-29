import './App.css';

import { BrowserRouter as Router } from 'react-router-dom'
import Body from './components/Body';

function App() {


  return (
    <Router>
      <div className="App">
        <Body />
      </div>
    </Router>
  );
}

export default App;
