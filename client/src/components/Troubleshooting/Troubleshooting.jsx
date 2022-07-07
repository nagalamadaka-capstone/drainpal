import React from 'react'
import NavBar from '../NavBar/NavBar'
import "./Troubleshooting.css"

function Troubleshooting({handleSignInOpen, handleCreateAccOpen, isLoggedIn, createAcc, troubleshooting, handleOnTroubleshootingChange, signIn, handleOnCreateAccFormChange, handleOnSignInFormChange, isSignInOpen, isCreateAccOpen, handleOnSignInSubmit}) {
  return (
    <div className='troubleshooting'>
        <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn = {isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        />
        <div className="notNavBar">
            <div className="wrapper">
                <h1>Troubleshooting</h1>
                <h2>Which drain is causing your concern?</h2>
                <select name="draintype" className="troubleshooting" value={troubleshooting.draintype}
                onChange={(e) => {handleOnTroubleshootingChange("draintype", e.target.value)}}>
                    <option value="">Select a Drain Type</option>
                    <option value="PCN">Percutaneous Nephrostomy Tube</option>
                </select>
                {troubleshooting.draintype && 
                <div className="q2">
                <h2>What type of issue are you having?</h2>
                <select name="issue" className="troubleshooting" value={troubleshooting.issue}
                onChange={(e) => {handleOnTroubleshootingChange("issue", e.target.value)}}>
                    <option value="">Select an Issue</option>
                    <option value="volumeChange">Change in Volume</option>
                    <option value="Bleeding">Bleeding</option>
                    <option value="Pain">Pain</option>
                    <option value="Other">Other</option>
                </select>
                </div>
                }
            </div>
        </div>

    </div>
  )
}

export default Troubleshooting
