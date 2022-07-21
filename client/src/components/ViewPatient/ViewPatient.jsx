import React from "react";
import NavBar from "../NavBar/NavBar";

function ViewPatient({
  isDoctorLoggedIn,
  isLoggedIn,
  handleSignInOpen,
  handleCreateAccOpen,
}) {
  return (
    <div className="viewPatient">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        isDoctorLoggedIn={isDoctorLoggedIn}
      />
      <div className="notNavBar">
        <div className="wrapper">
            <h1>Your Patient</h1>
        </div>
      </div>
    </div>
  );
}

export default ViewPatient;
