import React from 'react'
import "./NavBar.css"
import { Link } from "react-router-dom"


function NavBar({handleSignInOpen, handleCreateAccOpen, isLoggedIn}) {
    
  return (
    <div className = "navbar">
        <nav>
            {isLoggedIn ? 
            <ul>
                <Link to = "/">
                    <li><h1 id = "DrainPal">DrainPal</h1></li>
                </Link>
                <Link to = "/">
                    <li className='menuhover'>Home</li>
                </Link>
                <Link to ="/data">
                    <li className='menuhover'>Data Tracking</li>
                </Link>
                <Link to = "/troubleshooting">
                    <li className='menuhover'>Troubleshooting</li>
                </Link>
                <Link to = "/profile">
                    <li className='menuhover'>Profile</li>
                </Link>
            </ul>
            :
            <ul>
                <Link to = "/">
                <li><h1 id = "DrainPal">DrainPal</h1></li>
                </Link>
                <li><button className='menu-createacc' onClick = {() => handleCreateAccOpen()}>Create Account</button></li>
                <li><button className='menu-signin' onClick = {() => handleSignInOpen()}>Sign In</button></li>
            </ul>
            }   
        </nav>
    </div>
  )
}

export default NavBar
