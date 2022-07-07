import React from 'react'
import NavBar from '../NavBar/NavBar'
import "./Profile.css"

function Profile({handleSignInOpen, isLoggedIn, handleCreateAccOpen}) {
  return (
    <div className='profile'>
        <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn = {isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        />
        <div className="notNavBar">
            <div className="wrapper">
                <h1>Your Profile</h1>
                <h2>Name</h2>
                <h3>Sample Name</h3>
                <h2>Email</h2>
                <h3>Sample email</h3>
                <h2>Drain Type</h2>
                <h3>Sample drain type</h3>
                <button className="add-drain">Add Drain!</button>
                <h2>Your health care provider</h2>
                <h3>Sample health care provider</h3>
            </div>
        </div>
      
    </div>
  )
}

export default Profile
