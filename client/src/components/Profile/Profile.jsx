import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  handleProfileInfoChange,
  doctorsList,
  isDoctorLoggedIn,
  phone,
  hospital,
}) {
  const [isDrainTypeOpen, setIsDrainTypeOpen] = useState(false);
  const [isHealthcareProviderOpen, setIsHealthcareProviderOpen] =
    useState(false);

  const handleOnDrainTypeClick = () => {
    if (isDrainTypeOpen) {
      handleProfileInfoChange("current_draintype", draintype);
    }
    setIsDrainTypeOpen(!isDrainTypeOpen);
  };

  const handleOnHealthcareProviderClick = () => {
    if (isHealthcareProviderOpen) {
      handleProfileInfoChange("current_healthcareprovider", healthcareprovider);
    }
    setIsHealthcareProviderOpen(!isHealthcareProviderOpen);
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

          {isDoctorLoggedIn ? (
            <div className="doctor-profile">
              <h2>Hospital</h2>
              <h3>{hospital}</h3>
              <h2>Phone</h2>
              <h3>{phone}</h3>
            </div>
          ) : (
            <div className="patient-profile">
              <h2>Drain Type</h2>
              <h3>{draintype}</h3>
              {isDrainTypeOpen ? (
                <div className="drain-type-dropdown">
                  <select
                    name="draintype"
                    className="profile-draintype-dropdown"
                    value={draintype}
                    onChange={(e) => {
                      handleOnDrainTypeChange(e.target.value);
                    }}
                  >
                    <option value="">Select a Drain Type</option>
                    <option value="PCN">Percutaneous Nephrostomy Tube</option>
                  </select>
                </div>
              ) : null}
              <button
                className="add-drain"
                onClick={() => handleOnDrainTypeClick()}
              >
                {isDrainTypeOpen ? "Save" : "Add/Edit Drain Type"}
              </button>
              <h2>Your health care provider</h2>
              <h3>{healthcareprovider}</h3>
              {isHealthcareProviderOpen ? (
                <select
                  name="healthcareprovider"
                  className="healthcareprovider-input-profile"
                  value={healthcareprovider}
                  onChange={(e) => {
                    handleOnHealthcareProviderChange(e.target.value);
                  }}
                >
                  <option value="">Select a Healthcare Provider</option>
                  {doctorsList.map((doctor) => (
                    <option key={doctor.id} value={doctor.lastname}>
                      Dr. {doctor.firstname} {doctor.lastname}
                    </option>
                  ))}
                </select>
              ) : null}
              <button
                className="add-drain"
                onClick={() => handleOnHealthcareProviderClick()}
              >
                {isHealthcareProviderOpen
                  ? "Save"
                  : "Add/Edit Healthcare Provider"}
              </button>
            </div>
          )}
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

export default Profile;
