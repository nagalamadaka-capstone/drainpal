import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Banner({ handleSignInOpen, handleCreateAccOpen, isLoggedIn }) {
  const email = useParams();
  console.log("email: ", email);

  return (
    <div className="banner">
      {isLoggedIn ? (
        <div className="bannerLoggedIn">
          <h1>Welcome!</h1>
          <h2>
            DrainPal is a tool for users to track their pain levels due to a
            Percutaneous Nephrostomy Tube.
          </h2>
          <Link to="/datalog">
            <button>Track your daily pain levels!</button>
          </Link>
          <Link to="/troubleshooting">
            <button>Need help with your drain? Troubleshoot here!</button>
          </Link>
        </div>
      ) : (
        <div className="bannerNotLoggedIn">
          <h1>Welcome!</h1>
          <h2>
            DrainPal is a tool for users to track their pain levels due to a
            Percutaneous Nephrostomy Tube.
          </h2>
          <div className="signupbuttons">
            <button className="menu-signin" onClick={() => handleSignInOpen()}>
              Sign In
            </button>
            <button
              className="menu-createacc"
              onClick={() => handleCreateAccOpen()}
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
