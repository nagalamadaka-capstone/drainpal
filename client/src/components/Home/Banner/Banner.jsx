import React from 'react'
import "./Banner.css"

function Banner({handleSignInOpen, handleCreateAccOpen}) {
  return (
    <div className='banner'>
        <h1>Welcome!</h1>
        <h2>DrainPal is a tool for users to track their pain levels regarding a Percutaneous Nephrostomy Tube.</h2>
        <div className='signupbuttons'>
        <button className='menu-createacc' onClick = {() => handleCreateAccOpen()}>Create Account</button>
        <button className='menu-signin' onClick = {() => handleSignInOpen()}>Sign In</button>
        </div>
    </div>
  )
}

export default Banner
