import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Sidebar/Sidebar";

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isCreateAccOpen, setIsCreateAccOpen] = useState(false);
  const [createAcc, setCreateAcc] = useState({});
  const [signIn, setSignIn] = useState({});

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

  return (
    <div className="app">
      {/* <h1 className='work' style={{margin: 0 + 'em'}}>work</h1>
      <h1 className='work' style={{margin: 0 + 'em'}}>work</h1> */}
      <BrowserRouter>
        <div className="container">
          <Sidebar
            isSignInOpen={isSignInOpen}
            isCreateAccOpen={isCreateAccOpen}
            createAcc = {createAcc}
            handleOnCreateAccFormChange = {handleOnCreateAccFormChange}
            handleCreateAccOpen = {handleCreateAccOpen}
            handleSignInOpen = {handleSignInOpen}
            handleOnSignInFormChange = {handleOnSignInFormChange}
            signIn = {signIn}
          />
          <NavBar
            handleSignInOpen={handleSignInOpen}
            handleCreateAccOpen={handleCreateAccOpen}
          />
          <Routes>
            <Route path="/" element={<Home 
            handleSignInOpen = {handleSignInOpen}
            handleCreateAccOpen = {handleCreateAccOpen}
            />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
