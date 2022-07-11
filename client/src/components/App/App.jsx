import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../Home/Home";
import Troubleshooting from "../Troubleshooting/Troubleshooting";
import DataHome from "../DataHome/DataHome";
import Profile from "../Profile/Profile";
import DataLog from "../DataHome/DataLog/DataLog";
import LogSymptoms from "../DataHome/DataLog/LogSymptoms/LogSymptoms";
import "./App.css";
import axios from "axios";
const API_BASE_URL = "http://localhost:3001";

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isCreateAccOpen, setIsCreateAccOpen] = useState(false);
  const [createAcc, setCreateAcc] = useState({});
  const [signIn, setSignIn] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [troubleshooting, setTroubleshooting] = useState({});
  const [error, setError] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [draintype, setDraintype] = useState("");
  const [healthcareprovider, setHealthcareprovider] = useState("");

  function handleSignInOpen() {
    if (isSignInOpen) {
      setIsSignInOpen(false);
    } else {
      setIsSignInOpen(true);
      setIsCreateAccOpen(false);
    }
  }

  function handleCreateAccOpen() {
    if (isCreateAccOpen) {
      setIsCreateAccOpen(false);
    } else {
      setIsCreateAccOpen(true);
      setIsSignInOpen(false);
    }
  }

  function handleOnCreateAccFormChange(key, val) {
    let newForm = {
      firstname: createAcc.firstname,
      lastname: createAcc.lastname,
      email: createAcc.email,
      password: createAcc.password,
      draintype: createAcc.draintype,
      drainsite: createAcc.drainsite,
      healthcareprovider: createAcc.healthcareprovider,
    };
    newForm[key] = val;
    setCreateAcc(newForm);
  }

  function handleOnSignInFormChange(key, val) {
    let newForm = {
      email: signIn.email,
      password: signIn.password,
    };
    newForm[key] = val;
    setSignIn(newForm);
  }

  const handleOnSignInSubmit = async (signIn) => {
    setIsSignInOpen(false);

    try {
      const resp = await axios.post(`${API_BASE_URL}/users/login`, signIn);

      setIsLoggedIn(true);
      setFirstName(formatString(resp.data.firstname));
      setLastName(formatString(resp.data.lastname));
      setEmail(resp.data.email);
      setDraintype(resp.data.draintype);
      setHealthcareprovider(resp.data.healthcareprovider);
    } catch (err) {}
  };

  const handleOnCreateAccSubmit = async (createAcc) => {
    

    // catch common log in errors
    if (createAcc.email === "" || createAcc.password === "") {
      setError("Please fill out all fields");
      return;
    }
    if (createAcc.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const resp = await axios.post(
        `${API_BASE_URL}/users/register`,
        createAcc
      );
    } catch (err) {}

    setIsCreateAccOpen(false);
    setCreateAcc({});
  };

  const handleOnLogOut = async () => {
    console.log("logging out");
    
    
    try {
      const resp = await axios.post(
        `${API_BASE_URL}/users/logout`
      );
    } catch (err) {
      console.log('err: ', err);
    }

    setIsLoggedIn(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setDraintype("");
    setHealthcareprovider("");
  }

  function handleOnTroubleshootingChange(key, val) {
    let newForm = {
      draintype: troubleshooting.draintype,
      issue: troubleshooting.issue,
    };
    newForm[key] = val;
    setTroubleshooting(newForm);
  }

  function formatString(str) {
    let finalString =
      str.charAt(0).toUpperCase() +
      str.slice(1);
    return finalString;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  handleSignInOpen={handleSignInOpen}
                  handleCreateAccOpen={handleCreateAccOpen}
                  isLoggedIn={isLoggedIn}
                  createAcc={createAcc}
                  signIn={signIn}
                  handleOnCreateAccFormChange={handleOnCreateAccFormChange}
                  handleOnSignInFormChange={handleOnSignInFormChange}
                  isSignInOpen={isSignInOpen}
                  isCreateAccOpen={isCreateAccOpen}
                  handleOnSignInSubmit={handleOnSignInSubmit}
                  handleOnCreateAccSubmit={handleOnCreateAccSubmit}
                  firstName={firstName}
                />
              }
            />
            <Route
              path="/data"
              element={
                <DataHome
                  handleSignInOpen={handleSignInOpen}
                  handleCreateAccOpen={handleCreateAccOpen}
                  isLoggedIn={isLoggedIn}
                  createAcc={createAcc}
                  signIn={signIn}
                  handleOnCreateAccFormChange={handleOnCreateAccFormChange}
                  handleOnSignInFormChange={handleOnSignInFormChange}
                  isSignInOpen={isSignInOpen}
                  isCreateAccOpen={isCreateAccOpen}
                  handleOnSignInSubmit={handleOnSignInSubmit}
                  handleOnCreateAccSubmit={handleOnCreateAccSubmit}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  isLoggedIn={isLoggedIn}
                  handleSignInOpen={handleSignInOpen}
                  handleCreateAccOpen={handleCreateAccOpen}
                  firstname = {firstName}
                  lastname = {lastName}
                  email = {email}
                  draintype = {draintype}
                  healthcareprovider = {healthcareprovider}
                  handleOnLogOut={handleOnLogOut}
                />
              }
            />
            <Route
              path="/troubleshooting"
              element={
                <Troubleshooting
                  handleOnTroubleshootingChange={handleOnTroubleshootingChange}
                  troubleshooting={troubleshooting}
                  handleSignInOpen={handleSignInOpen}
                  handleCreateAccOpen={handleCreateAccOpen}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/datalog"
              element={
                <DataLog
                  isLoggedIn={isLoggedIn}
                  handleSignInOpen={handleSignInOpen}
                  handleCreateAccOpen={handleCreateAccOpen}
                />
              }
            />
            <Route
              path="/logsymptoms"
              element={
                <LogSymptoms
                  isLoggedIn={isLoggedIn}
                  handleSignInOpen={handleSignInOpen}
                  handleCreateAccOpen={handleCreateAccOpen}
                />
              }
            />
            <Route path="/:email:password" element={null} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
