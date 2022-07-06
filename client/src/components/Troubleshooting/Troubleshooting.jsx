import React from 'react'
import NavBar from '../NavBar/NavBar'
import "./Troubleshooting.css"

function Troubleshooting({handleSignInOpen, handleCreateAccOpen, isLoggedIn, createAcc, signIn, handleOnCreateAccFormChange, handleOnSignInFormChange, isSignInOpen, isCreateAccOpen, handleOnSignInSubmit}) {
  return (
    <div className='troubleshooting'>
        <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn = {isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        />
    </div>
  )
}

export default Troubleshooting
