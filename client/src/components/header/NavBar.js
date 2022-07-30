import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

function NavBar() {


  return (
    <div>
      <ul>
        <li> <Link to="/"> Sign Up</Link></li>
        <li> <Link to="/login"> Login</Link></li>
        <li> <Link to="/userInterface"> For authorized users</Link></li>
      </ul>






    </div >
  )
}


export default NavBar;
