import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../Home/Home";
import Troubleshooting from "../Troubleshooting/Troubleshooting";
import DataHome from "../DataHome/DataHome";
import Profile from "../Profile/Profile";
import DataLog from "../DataHome/DataLog/DataLog";
import LogSymptoms from "../DataHome/DataLog/LogSymptoms/LogSymptoms";
import ArticleView from "../ArticleView/ArticleView";
import "./App.css";
import axios from "axios";
const API_BASE_URL = "http://localhost:3001";

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isCreateAccOpen, setIsCreateAccOpen] = useState(false);
  const [createAcc, setCreateAcc] = useState({});
  const [signIn, setSignIn] = useState({});
  const [troubleshooting, setTroubleshooting] = useState({});
  const [createaccerror, setCreateaccerror] = useState("");
  const [signinerror, setSigninerror] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("current_user_id") !== null
  );
  const [firstName, setFirstName] = useState(
    localStorage.getItem("current_firstname")
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("current_lastname")
  );
  const [email, setEmail] = useState(localStorage.getItem("current_email"));
  const [draintype, setDraintype] = useState(
    localStorage.getItem("current_draintype")
  );
  const [healthcareprovider, setHealthcareprovider] = useState(
    localStorage.getItem("current_healthcareprovider")
  );
  const [articles, setArticles] = useState([]);

  useEffect (() => {
    axios.get(`${API_BASE_URL}/articles/`).then(res => {     
      setArticles(res.data.newArticles);
    }
    );
  }, []);

  const addAuthenticationHeader = () => {
    const currentUserId = localStorage.getItem("current_user_id");
    if (currentUserId !== null) {
      axios.defaults.headers.common = {
        current_user_id: currentUserId,
      };
    }
  };
  addAuthenticationHeader();

  function handleSignInOpen() {
    setSigninerror("");
    if (isSignInOpen) {
      setIsSignInOpen(false);
    } else {
      setIsSignInOpen(true);
      setIsCreateAccOpen(false);
    }
  }

  function handleCreateAccOpen() {
    setCreateaccerror("");
    if (isCreateAccOpen) {
      setIsCreateAccOpen(false);
    } else {
      setIsCreateAccOpen(true);
      setIsSignInOpen(false);
    }
  }

  function handleOnDrainTypeChange(val) {
    localStorage.setItem("current_draintype", val);
    setDraintype(val);
  }

  function handleOnHealthcareProviderChange(val) {
    localStorage.setItem("current_healthcareprovider", val);
    setHealthcareprovider(val);
  }

  const getProfileInfo = async (key, id) => {
      try{
        const response = await axios.get(`${API_BASE_URL}/users/getprofileinfo`, {params: {key, id}});
        return response.data.key;
      }
      catch(err){
      }
  }
    

  const handleProfileInfoChange = async (key, value) => {
    var realKey = key.replace("current_", "");
    localStorage.setItem(key, value);
    if (key === "current_firstname") {
      setFirstName(value);
    } else if (key === "current_lastname") {
      setLastName(value);
    } else if (key === "current_email") {
      setEmail(value);
    } else if (key === "current_draintype") {
      setDraintype(value);
    } else {
      setHealthcareprovider(value);
    }

    try{
      await axios.post(`${API_BASE_URL}/users/changeprofile`, {
        key: realKey,
        value: value,
        id: localStorage.getItem("current_user_id"),
        });
    }
    catch(err){
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
    if (!signIn.email || !signIn.password) {
      setSigninerror("Please fill out all fields.");
      return;
    }

    if (!signIn.email.includes("@") || !signIn.email.includes(".")) {
      setSigninerror("Please enter a valid email.");
      return;
    }

    try {
      const resp = await axios.post(`${API_BASE_URL}/users/login`, signIn);
      let user = resp.data;
      localStorage.setItem("current_user_id", user["objectId"]);
      localStorage.setItem("current_firstname", formatString(user.firstname));
      localStorage.setItem("current_lastname", formatString(user.lastname));
      localStorage.setItem("current_email", user.email);
      localStorage.setItem("current_draintype", user.draintype);
      localStorage.setItem(
        "current_healthcareprovider",
        user.healthcareprovider
      );
      addAuthenticationHeader();

      setIsLoggedIn(true);
      setSigninerror("");
      setFirstName(formatString(resp.data.firstname));
      setLastName(formatString(resp.data.lastname));
      setEmail(resp.data.email);
      setDraintype(resp.data.draintype);
      setHealthcareprovider(resp.data.healthcareprovider);
      setIsSignInOpen(false);
      setSignIn({
        email: "",
        password: "",
      });
    } catch (err) {
      setSigninerror("Incorrect username/password. Please try again.");
    }
  };

  const handleOnCreateAccSubmit = async (createAcc) => {
    if (
      !createAcc.firstname ||
      !createAcc.lastname ||
      !createAcc.email ||
      !createAcc.password ||
      !createAcc.draintype ||
      !createAcc.drainsite ||
      !createAcc.healthcareprovider
    ) {
      setCreateaccerror("Please fill out all fields.");
      return;
    }

    if (createAcc.password.length < 8) {
      setCreateaccerror("Password must be at least 8 characters");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/users/register`, createAcc);
      setCreateaccerror(
        "Success! You can now sign in with your email and password."
      );
      setCreateAcc({});
    } catch (err) {
      setCreateaccerror(
        "Account already exists for that email. Please try again."
      );
    }
  };

  const handleOnLogOut = async () => {
    try {
      await axios.post(`${API_BASE_URL}/users/logout`);
      localStorage.removeItem("current_user_id");
      localStorage.removeItem("current_firstname");
      localStorage.removeItem("current_lastname");
      localStorage.removeItem("current_email");
      localStorage.removeItem("current_draintype");
      localStorage.removeItem("current_healthcareprovider");
      axios.defaults.headers.common = {};
      setIsLoggedIn(false);
    } catch (err) {}
  };

  function handleOnTroubleshootingChange(key, val) {
    let newForm = {
      draintype: troubleshooting.draintype,
      issue: troubleshooting.issue,
    };
    newForm[key] = val;
    setTroubleshooting(newForm);
  }

  const handleFacebookLoginResponse = async function (response) {
    
    var fullName = response.name;
    const [first, last] = fullName.split(" ");
    if (response.error !== undefined) {
      return false;
    } else {
      const infoUser = {
        id: response.id,
        email: response.email,
        password: response.id,
        accessToken: response.accessToken,
        firstname: first,
        lastname: last,
      };
      try {
        const loginInfo = await axios.post(
          `${API_BASE_URL}/users/fblogin`,
          infoUser
        );
        
        let user = loginInfo.data;
        localStorage.setItem("current_user_id", user["objectId"]);
        localStorage.setItem("current_firstname", formatString(first));
        localStorage.setItem("current_lastname", formatString(last));
        localStorage.setItem("current_email", infoUser.email);
        const currDrain = await getProfileInfo("draintype", localStorage.getItem("current_user_id"));
        const currHealthcareprovider = await getProfileInfo("healthcareprovider", localStorage.getItem("current_user_id"));

        localStorage.setItem("current_draintype", currDrain);
        localStorage.setItem(
          "current_healthcareprovider",
          currHealthcareprovider
        );
        handleProfileInfoChange("firstname", first);
        handleProfileInfoChange("lastname", last);
        handleProfileInfoChange("email", infoUser.email);
        addAuthenticationHeader();

        setIsLoggedIn(true);
        setFirstName(formatString(first));
        setLastName(formatString(last));
        setEmail(response.email);
        setDraintype(localStorage.getItem("current_draintype"));
        setHealthcareprovider(
          localStorage.getItem("current_healthcareprovider"));
        setIsSignInOpen(false);
      } catch (err) {}
    }
  };

  function formatString(str) {
    let finalString = str.charAt(0).toUpperCase() + str.slice(1);
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
                  createaccerror={createaccerror}
                  signinerror={signinerror}
                  handleFacebookLoginResponse={handleFacebookLoginResponse}
                  articles = {articles}
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
                  firstname={firstName}
                  lastname={lastName}
                  email={email}
                  draintype={draintype}
                  healthcareprovider={healthcareprovider}
                  handleOnLogOut={handleOnLogOut}
                  handleOnDrainTypeChange={handleOnDrainTypeChange}
                  handleOnHealthcareProviderChange={
                    handleOnHealthcareProviderChange
                  }
                  handleProfileInfoChange = {handleProfileInfoChange}
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
                  id = {localStorage.getItem("current_user_id")}
                />
              }
            />
            <Route path="/articles/:articleid" element={
              <ArticleView
                isLoggedIn={isLoggedIn}
                handleSignInOpen={handleSignInOpen}
                handleCreateAccOpen={handleCreateAccOpen}
                articles = {articles}
              />
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
