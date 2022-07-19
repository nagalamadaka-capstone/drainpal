import React from 'react'
import NavBar from '../../NavBar/NavBar'
import "./DataLog.css"
import {Link} from 'react-router-dom'
import { useState } from 'react';
import Slider from './slider';

function DataLog({handleSignInOpen, handleCreateAccOpen, isLoggedIn}) {
    const date = new Date().toDateString();
    const [isLogSymptomsOpen, setIsLogSymptomsOpen] = useState(false);
    var sliderArray = ["pain", "sleeping", "nausea", "bowels", "appetite", "breathing", "fatigue"];
    const [sliderArrayValues, setSliderArrayValues] = useState([5, 5, 5, 5, 5, 5, 5]);
    const [symptoms, setSymptoms] = useState("");
    const [concerns, setConcerns] = useState("");
    const [drainOutput, setDrainOutput] = useState("");
    
    const [drainColor, setDrainColor] = useState("");
    
    const [drainOutputPhoto, setDrainOutputPhoto] = useState("");
    
    const [drainSkinSitePhoto, setDrainSkinSitePhoto] = useState("");
    
    
    function onLogSymptomsClick() {
        setIsLogSymptomsOpen(!isLogSymptomsOpen);
    }

    const onSliderChange = (e, sliderNumber) => {
        setSliderArrayValues(sliderArrayValues.map((value, index) => {
            if (index === sliderNumber) {
                return e;
            }
            return value;
        }
        ));
    }

    const onSymptomsChange = (e) => {
        setSymptoms(e.target.value);
    }

    const onConcernsChange = (e) => {
        setConcerns(e.target.value);
    }

    const onDrainOutputChange = (e) => {
        setDrainOutput(e.target.value);
    }

    const onDrainColorChange = (e) => {
        setDrainColor(e.target.value);
    }

    const onDrainOutputPhotoChange = (e) => {
        setDrainOutputPhoto(e.target.value);
    }

    const onDrainSkinSitePhotoChange = (e) => {
        setDrainSkinSitePhoto(e.target.value);
    }

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
                {isLogSymptomsOpen ? 
                <div className='logsymptoms'>
                       <div className='rating-scale'> 0 = absent 10 = worst possible</div>
                       <h2>Please rate your:</h2>
                       <h3>distress from pain</h3>
                       <Slider onSliderChange = {onSliderChange} sliderNumber = {0}/>
                       <h3>distress from difficulty sleeping</h3>
                       <Slider onSliderChange = {onSliderChange} sliderNumber = {1}/>
                       <h3>distress from nausea</h3>
                       <Slider onSliderChange = {onSliderChange} sliderNumber = {2}/>
                       <h3>distress from bowels</h3>
                       <Slider onSliderChange = {onSliderChange} sliderNumber = {3}/>
                       <h3>distress from appetite</h3>
                       <Slider onSliderChange = {onSliderChange} sliderNumber = {4}/>
                       <h3>distress from diffulty breathing</h3>
                       <Slider onSliderChange = {onSliderChange} sliderNumber = {5}/>
                       <h3>distress from fatigue</h3>
                       <Slider onSliderChange = {onSliderChange} sliderNumber = {6}/>
                       <h2>Do you have any other symptoms?</h2>
                       <input type="text" className='logsymptoms-input' onChange = {(e) => onSymptomsChange(e)}/>
                       
                       <h2>Do you have any concerns about your drain?</h2>
                       <input type="text" className='logsymptoms-input' onChange = {(e) => onConcernsChange(e)}/>
                </div>
                : 
                null}
                <button className='log-symptoms' onClick = {() => onLogSymptomsClick()}>
                    {isLogSymptomsOpen ? 'Save' : 'Log Symptoms'}
                </button>
                <h3>Drain output amount in mL</h3>
                <input type="text" className = "datalog-input" placeholder="e.g. 100" onChange = {(e) => onDrainOutputChange(e)}/>
                <h3>Drain output color</h3>
                <input type="text"  className = "datalog-input" placeholder="e.g. yellowish green" onChange = {(e) => onDrainColorChange(e)}/>
                <h3>Drain output photo</h3>
                <input type="file" className = "datalog-choose-file" placeholder="Drain output photo" onChange = {(e) => onDrainOutputPhotoChange(e)}/>
                <h3>Drain skin site photo</h3>
                <input type="file" className = "datalog-choose-file" placeholder="Drain skin site photo" onChange = {(e) => onDrainSkinSitePhotoChange(e)}/>
                <button className='save-data-log'>Save Data Log</button>
            </div>
        </div>
    </div>
  )
}

export default DataLog
