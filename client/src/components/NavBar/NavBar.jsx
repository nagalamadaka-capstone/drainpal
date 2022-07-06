import React from 'react'
import "./NavBar.css"
import { Link } from "react-router-dom"


function NavBar({handleSignInOpen, handleCreateAccOpen}) {
    
  return (
    <div className = "navbar">
        <nav>
            <ul>
                <Link to = "/">
                <li><h1 id = "DrainPal">DrainPal</h1></li>
                </Link>
                <li><button className='menu-createacc' onClick = {() => handleCreateAccOpen()}>Create Account</button></li>
                <li><button className='menu-signin' onClick = {() => handleSignInOpen()}>Sign In</button></li>
            </ul>
        </nav>
    </div>
  )
}

export default NavBar
