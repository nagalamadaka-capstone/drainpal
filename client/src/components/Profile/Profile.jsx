import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";
import {Link } from "react-router-dom";
import {useState} from "react";

function Profile({
  handleSignInOpen,
  isLoggedIn,
  handleCreateAccOpen,
  firstname,
  lastname,
  email,
  draintype,
  healthcareprovider,
  handleOnLogOut,
  handleOnHealthcareProviderChange,
  handleOnDrainTypeChange,
}) {

    const [isDrainTypeOpen, setIsDrainTypeOpen] = useState(false);
    const [isHealthcareProviderOpen, setIsHealthcareProviderOpen] = useState(false);

    const handleOnDrainTypeClick = () => {
        setIsDrainTypeOpen(!isDrainTypeOpen);
    }

    const handleOnHealthcareProviderClick = () => {
        setIsHealthcareProviderOpen(!isHealthcareProviderOpen);
    }

  return (
    <div className="profile">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
      />
      <div className="notNavBar">
        <div className="wrapper">
          <h1>Your Profile</h1>
          <h2>Name</h2>
          <h3>
            {firstname} {lastname}
          </h3>
          <h2>Email</h2>
          <h3>{email}</h3>
          <h2>Drain Type</h2>
          <h3>{draintype}</h3>
          {isDrainTypeOpen ?  
            <div className="drain-type-dropdown">
                <select name="draintype" className="profile-draintype-dropdown" value={draintype}
                onChange={(e) => {handleOnDrainTypeChange(e.target.value)}}>
                    <option value="">Select a Drain Type</option>
                    <option value="PCN">Percutaneous Nephrostomy Tube</option>
                </select>
            </div>
            : null}
          <button className="add-drain" onClick = {() => handleOnDrainTypeClick()}>Add Drain!</button>
          <h2>Your health care provider</h2>
          <h3>{healthcareprovider}</h3>
          {isHealthcareProviderOpen ?  
          <input type="text" className = "healthcareprovider-input-profile" onChange={(e) => {
            handleOnHealthcareProviderChange(e.target.value);
          }}/>
            : 
            null}
          <button className="add-drain" onClick = {() => handleOnHealthcareProviderClick()}>Add Healthcare Provider!</button>
          <Link to = "/">
          <button className="add-drain" type="button" onClick = {()=> handleOnLogOut()}>
            Log Out
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
