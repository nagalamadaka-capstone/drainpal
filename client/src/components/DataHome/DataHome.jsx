import React from 'react'
import NavBar from '../NavBar/NavBar'
import "./DataHome.css"
import {Link} from 'react-router-dom'

function DataHome({handleSignInOpen, handleCreateAccOpen, isLoggedIn, createAcc, signIn, handleOnCreateAccFormChange, handleOnSignInFormChange, isSignInOpen, isCreateAccOpen, handleOnSignInSubmit}) {
  return (
    <div className='dataHome'>
        <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn = {isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        />
        <h1>Data</h1>
        <h2>Past Logs</h2>
        <Link to = "/datalog"><button>Add new data log</button></Link>
        <div className="timeline">
            <div className="timeline-component">
                <div className="timeline-date">sample date</div>
            </div>
            <div className="timeline-middle">
                <div className="timeline-point"></div>
            </div>
            <div className="timeline-component timeline-data-entry">
                <h2>Sample data entry</h2>
                <p>details about data entry</p>
            </div>
            <div className="timeline-component">
                <div className="timeline-date">sample date</div>
            </div>
            <div className="timeline-middle">
                <div className="timeline-point"></div>
            </div>
            <div className="timeline-component timeline-data-entry">
                <h2>Sample data entry</h2>
                <p>details about data entry</p>
            </div>
            <div className="timeline-component">
                <div className="timeline-date">sample date</div>
            </div>
            <div className="timeline-middle">
                <div className="timeline-point"></div>
            </div>
            <div className="timeline-component timeline-data-entry">
                <h2>Sample data entry</h2>
                <p>details about data entry</p>
            </div>
        </div>
    </div>
  )
}

export default DataHome
