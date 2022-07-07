import React from 'react'
import NavBar from '../../NavBar/NavBar'
import "./DataLog.css"
import {Link} from 'react-router-dom'

function DataLog({handleSignInOpen, handleCreateAccOpen, isLoggedIn}) {
    const date = new Date().toDateString();

  return (
    <div className='dataLog'>
        <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn = {isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        />
        <div className="notNavBar">
            <div className="wrapper">
                <h1>Data Log</h1>
                <h2>{date}</h2>
                <h3>How are you feeling today?</h3>
                <Link to="/logsymptoms">
                <button className='log-symptoms'>Log my symptoms</button>
                </Link>
                <h3>Drain output amount in mL</h3>
                <input type="text" className = "datalog-input" placeholder="e.g. 100"/>
                <h3>Drain output color</h3>
                <input type="text"  className = "datalog-input" placeholder="e.g. yellowish green"/>
                <h3>Drain output photo</h3>
                <input type="file" className = "datalog-choose-file" placeholder="Drain output photo"/>
                <h3>Drain skin site photo</h3>
                <input type="file" className = "datalog-choose-file" placeholder="Drain skin site photo"/>
                <button className='save-data-log'>Save Data Log</button>
            </div>
        </div>
    </div>
  )
}

export default DataLog
