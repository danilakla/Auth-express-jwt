import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

function NavBar() {


  return (
    <div>
      <ul>
        <li> <Link to="/"> Sign Up</Link></li>
        <li> <Link to="/login"> Login</Link></li>
      </ul>






    </div >
  )
}


export default NavBar;
