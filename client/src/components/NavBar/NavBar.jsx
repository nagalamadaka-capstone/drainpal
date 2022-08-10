import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar({
  handleSignInOpen,
  handleCreateAccOpen,
  isLoggedIn,
  isDoctorLoggedIn,
}) {
  return (
    <div className="navbar">
      <nav>
        {isLoggedIn && isDoctorLoggedIn ? (
          <ul>
            <div className="navbar-container">
              <Link to="/">
                <li id="DrainPalLi">
                  <h1 id="DrainPal">DrainPal</h1>
                </li>
              </Link>
              <Link to="/profile">
                <li className="menuhover">
                  <h2>Profile</h2>
                </li>
              </Link>
              <Link to="/allpatients">
                <li className="menuhover">
                  <h2>All Patients</h2>
                </li>
              </Link>
              <Link to="/alerts">
                <li className="menuhover">
                  <h2>Alerts</h2>
                </li>
              </Link>
              <Link to="/troubleshooting">
                <li className="menuhover">
                  <h2>Troubleshooting</h2>
                </li>
              </Link>
              <Link to="/">
                <li className="menuhover">
                  <h2>Home</h2>
                </li>
              </Link>
            </div>
          </ul>
        ) : isLoggedIn && !isDoctorLoggedIn ? (
          <ul>
            <div className="navbar-container">
              <Link to="/">
                <li id="DrainPalLi">
                  <h1 id="DrainPal">DrainPal</h1>
                </li>
              </Link>
              <Link to="/profile">
                <li className="menuhover">
                  <h2>Profile</h2>
                </li>
              </Link>
              <Link to="/troubleshooting">
                <li className="menuhover">
                  <h2>Troubleshooting</h2>
                </li>
              </Link>
              <Link to="/data">
                <li className="menuhover">
                  <h2>Data Tracking</h2>
                </li>
              </Link>
              <Link to="/">
                <li className="menuhover">
                  <h2>Home</h2>
                </li>
              </Link>
            </div>
          </ul>
        ) : (
          <ul>
            <Link to="/">
              <li>
                <h1 id="DrainPal">DrainPal</h1>
              </li>
            </Link>
            <li>
              <button
                className="menu-createacc"
                onClick={() => handleCreateAccOpen()}
              >
                <h2>Create Account</h2>
              </button>
            </li>
            <li>
              <button
                className="menu-signin"
                onClick={() => handleSignInOpen()}
              >
                <h2>Sign In</h2>
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
