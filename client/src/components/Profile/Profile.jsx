import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";
import {Link } from "react-router-dom";

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
}) {
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
          <button className="add-drain">Add Drain!</button>
          <h2>Your health care provider</h2>
          <h3>{healthcareprovider}</h3>
          <button className="add-drain">Add Healthcare Provider!</button>
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
