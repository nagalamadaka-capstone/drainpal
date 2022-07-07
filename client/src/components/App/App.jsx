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
// import NavBar from "../NavBar/NavBar";
// import Sidebar from "../Sidebar/Sidebar";

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isCreateAccOpen, setIsCreateAccOpen] = useState(false);
  const [createAcc, setCreateAcc] = useState({});
  const [signIn, setSignIn] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [troubleshooting, setTroubleshooting] = useState({});

  function handleSignInOpen() {
    if(isSignInOpen) {
      setIsSignInOpen(false);
    }
    else {
      setIsSignInOpen(true);
      setIsCreateAccOpen(false);
    }
  }

  function handleCreateAccOpen() {
    if(isCreateAccOpen) {
      setIsCreateAccOpen(false);
    }
    else {
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
      draintype : createAcc.draintype,
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

  function handleOnSignInSubmit(){
    console.log("sign in submit");
    setIsSignInOpen(false);
    setIsLoggedIn(true);
  }

  function handleOnTroubleshootingChange(key, val) {
    let newForm = {
      draintype : troubleshooting.draintype,
      issue: troubleshooting.issue,
    };
    newForm[key] = val;
    setTroubleshooting(newForm);
  }

  console.log("isLoggedIn", isLoggedIn);
  return (
    <div className="app">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home 
              handleSignInOpen = {handleSignInOpen}
              handleCreateAccOpen = {handleCreateAccOpen}
              isLoggedIn = {isLoggedIn}
              createAcc = {createAcc}
              signIn = {signIn}
              handleOnCreateAccFormChange = {handleOnCreateAccFormChange}
              handleOnSignInFormChange = {handleOnSignInFormChange}
              isSignInOpen = {isSignInOpen}
              isCreateAccOpen = {isCreateAccOpen}
              handleOnSignInSubmit = {handleOnSignInSubmit}
            />} />
            <Route path="/data" element={<DataHome
              handleSignInOpen = {handleSignInOpen}
              handleCreateAccOpen = {handleCreateAccOpen}
              isLoggedIn = {isLoggedIn}
              createAcc = {createAcc}
              signIn = {signIn}
              handleOnCreateAccFormChange = {handleOnCreateAccFormChange}
              handleOnSignInFormChange = {handleOnSignInFormChange}
              isSignInOpen = {isSignInOpen}
              isCreateAccOpen = {isCreateAccOpen}
              handleOnSignInSubmit = {handleOnSignInSubmit}
            />} />
            <Route path="/profile" element={<Profile
            isLoggedIn={isLoggedIn}
            handleSignInOpen={handleSignInOpen}
            handleCreateAccOpen={handleCreateAccOpen}
            />} />
            <Route path="/troubleshooting" element={<Troubleshooting
              handleOnTroubleshootingChange = {handleOnTroubleshootingChange}
              troubleshooting = {troubleshooting}
              handleSignInOpen = {handleSignInOpen}
              handleCreateAccOpen = {handleCreateAccOpen}
              isLoggedIn = {isLoggedIn}
              createAcc = {createAcc}
              signIn = {signIn}
              handleOnCreateAccFormChange = {handleOnCreateAccFormChange}
              handleOnSignInFormChange = {handleOnSignInFormChange}
              isSignInOpen = {isSignInOpen}
              isCreateAccOpen = {isCreateAccOpen}
              handleOnSignInSubmit = {handleOnSignInSubmit}
            />} />
            <Route path="/datalog" element={<DataLog
              isLoggedIn={isLoggedIn}
              handleSignInOpen={handleSignInOpen}
              handleCreateAccOpen={handleCreateAccOpen}
            />} />
            <Route path="/logsymptoms" element={<LogSymptoms
            isLoggedIn={isLoggedIn}
            handleSignInOpen={handleSignInOpen}
            handleCreateAccOpen={handleCreateAccOpen}
            />}/>
            <Route path="/:email:password" element={null} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
