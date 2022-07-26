import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  const [phoneError, setPhoneError] = useState("");

  const handleOnHospitalClick = () => {
    if (isHospitalOpen) {
      handleProfileInfoChange("current_hospital", hospital);
    }
    setIsHospitalOpen(!isHospitalOpen);
  };

  const handleOnPhoneClick = () => {
    if (phone.length != 10){
        setPhoneError("Phone number must be 10 digits long");
    }
    else{
        setPhoneError("");
        if (isPhoneOpen) {
            handleProfileInfoChange("current_phone", phone);
          }
    }

    
    setIsPhoneOpen(!isPhoneOpen);
  };

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
            {isHospitalOpen ? (
              <div className="hospital-change">
                <input
                  type="text"
                  placeholder="Hospital"
                  className="profile-input"
                  onChange={(e) => handleOnHospitalChange(e.target.value)}
                  value={hospital}
                />
                <button
                  className="add-drain"
                  onClick={() => handleOnHospitalClick()}
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                className="add-drain"
                onClick={() => handleOnHospitalClick()}
              >
                Change Hospital
              </button>
            )}

            <h2>Phone</h2>
            {phoneError ? <h4 className="error-message">{phoneError}</h4> : null}
            <h3>{phone}</h3>
            {isPhoneOpen ? (
              <div className="phone-change">
                <input
                  type="text"
                  placeholder="Phone"
                  className="profile-input"
                  onChange={(e) => handleOnPhoneChange(e.target.value)}
                  value={phone}
                />
                <button
                  className="add-drain"
                  onClick={() => handleOnPhoneClick()}
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                className="add-drain"
                onClick={() => handleOnPhoneClick()}
              >
                Change Phone
              </button>
            )}
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
