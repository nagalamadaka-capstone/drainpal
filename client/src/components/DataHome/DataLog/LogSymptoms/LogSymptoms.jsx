import React from 'react'
import NavBar from '../../../NavBar/NavBar'
import "./LogSymptoms.css"
import Slider from './slider'

function LogSymptoms({handleSignInOpen, isLoggedIn, handleCreateAccOpen}) {

  return (
    <div className='logsymptoms'>
         <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn = {isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        /> 
        <div className="notNavBar">
            <div className="wrapper">
                <h1>How are you feeling today?</h1>
                <div className='rating-scale'> 0 = absent 10 = worst possible</div>
                <h2>Please rate your:</h2>
                <h3>distress from pain</h3>
                <Slider />
                <h3>distress from difficulty sleeping</h3>
                <Slider />
                <h3>distress from nausea</h3>
                <Slider />
                <h3>distress from bowels</h3>
                <Slider />
                <h3>distress from appetite</h3>
                <Slider />
                <h3>distress from diffulty breathing</h3>
                <Slider />
                <h3>distress from fatigue</h3>
                <Slider />
                <h2>Do you have any other symptoms?</h2>
                <input type="text" className='logsymptoms-input'/>
                
                <h2>Do you have any concerns about your drain</h2>
                <input type="text" className='logsymptoms-input'/>
                <button className='save-data-log'>Save</button>


            </div>
        </div>
    </div>
  )
}

export default LogSymptoms
