import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";
import { Link } from "react-router-dom";

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
}) {
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
            <h2>Phone</h2>
            <h3>{phone}</h3>
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
