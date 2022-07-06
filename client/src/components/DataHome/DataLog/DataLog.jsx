import React from 'react'
import NavBar from '../../NavBar/NavBar'

function DataLog({handleSignInOpen, handleCreateAccOpen, isLoggedIn}) {
    const date = new Date().toDateString();

  return (
    <div className='dataLog'>
        <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn = {isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        />
        <h1>Data Log</h1>
        <h2>{date}</h2>
        <h3>How are you feeling today?</h3>
        <button>Log my symptoms</button>
        <h3>Drain output amount</h3>
        <input type="text" placeholder="Drain output amount in mL"/>
        <h3>Drain output color</h3>
        <input type="text" placeholder="Drain output color"/>
        <h3>Drain output photo</h3>
        <input type="file" placeholder="Drain output photo"/>
        <h3>Drain skin site photo</h3>
        <input type="file" placeholder="Drain skin site photo"/>
        <button>submit data log</button>
    </div>
  )
}

export default DataLog
