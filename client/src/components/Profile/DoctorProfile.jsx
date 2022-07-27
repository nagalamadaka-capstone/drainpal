import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import ChangeProfileInput from "./ChangeProfileInput";

function DoctorProfile({
  handleSignInOpen,
  isLoggedIn,
  handleCreateAccOpen,
  firstname,
  lastname,
  email,
  handleOnLogOut,
  handleProfileInfoChange,
  isDoctorLoggedIn,
  phone,
  hospital,
  handleOnHospitalChange,
  handleOnPhoneChange,
}) {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isHospitalOpen, setIsHospitalOpen] = useState(false);

  return (
    <div className="profile">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        isDoctorLoggedIn={isDoctorLoggedIn}
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

          <div className="doctor-profile">
            <h2>Hospital</h2>
            <h3>{hospital}</h3>
            <ChangeProfileInput componentName = {"hospital"} 
            component = {hospital}
            handleComponentChange = {handleOnHospitalChange}
            currComponentName = {"current_hospital"}
            handleProfileInfoChange = {handleProfileInfoChange}
            />

            <h2>Phone</h2>
            <h3>{phone}</h3>
            <ChangeProfileInput componentName = {"phone"}
            component = {phone}
            handleComponentChange = {handleOnPhoneChange}
            currComponentName = {"current_phone"}
            handleProfileInfoChange = {handleProfileInfoChange}
            />
          </div>

          <Link to="/">
            <button
              className="add-drain"
              type="button"
              onClick={() => handleOnLogOut()}
            >
              Log Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
