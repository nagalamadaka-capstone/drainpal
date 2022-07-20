import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Banner({
  handleSignInOpen,
  handleCreateAccOpen,
  isLoggedIn,
  firstName,
  userId,

}) {
    const [hasLoggedData, setHasLoggedData] = useState(false);
    const API_BASE_URL = "http://localhost:3001";
    const date = new Date().toDateString();

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/datalogs/check`, {
                params: {
                    userId: userId,
                    date: date,
                },
            });
            if (response.data === "true" || response.data === true) {
                setHasLoggedData(true);
            } else {
                setHasLoggedData(false);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }
    , []);

  return (
    <div className="banner">
      {isLoggedIn ? (
        <div className="bannerLoggedIn">
          <h1>Welcome, {firstName}!</h1>
          <h2>
            DrainPal is a tool for users to track their pain levels due to a
            Percutaneous Nephrostomy Tube.
          </h2>
          {hasLoggedData ? (null) 
          : 
          (<Link to="/datalog">
            <button>{firstName}, you have not tracked your daily pain levels yet! Click here to track them.</button>
          </Link>
          )
            }
          
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
