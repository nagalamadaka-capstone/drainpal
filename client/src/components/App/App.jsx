import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../Home/Home";
import Troubleshooting from "../Troubleshooting/Troubleshooting";
import DataHome from "../DataHome/DataHome";
import Profile from "../Profile/Profile";
import DataLog from "../DataHome/DataLog/DataLog";
import Loading from "../Loading/Loading";
import AllPatients from "../AllPatients/AllPatients";
import ViewPatient from "../ViewPatient/ViewPatient";
import "./App.css";
import axios from "axios";
import DoctorProfile from "../Profile/DoctorProfile";
import Alerts from "../Alerts/Alerts";
import PalliativeCare from "../InfoArticles/PalliativeCare";
import GeneralCare from "../InfoArticles/GeneralCare";
import Biliary from "../InfoArticles/Biliary";
const API_BASE_URL = "http://localhost:3001";

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isCreateAccOpen, setIsCreateAccOpen] = useState(false);
  const [createAcc, setCreateAcc] = useState({});
  const [signIn, setSignIn] = useState({});
  const [createaccerror, setCreateaccerror] = useState("");
  const [createaccsuccess, setCreateaccsuccess] = useState("");
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
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [doctorsList, setDoctorsList] = useState(
    localStorage.getItem("curr_doctors")
  );

  /* Doctor specific states **/
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(
    localStorage.getItem("current_doctor_id") !== null
  );
  const [phone, setPhone] = useState(localStorage.getItem("current_phone"));
  const [hospital, setHospital] = useState(
    localStorage.getItem("current_hospital")
  );
  const [alerts, setAlerts] = useState([]);
  const [isAlertLoading, setIsAlertLoading] = useState(true);
  const [alertError, setAlertError] = useState(null);

  const enumLocalStorageKeys = {
    current_user_id: "current_user_id",
    current_firstname: "current_firstname",
    current_lastname: "current_lastname",
    current_email: "current_email",
    current_draintype: "current_draintype",
    current_healthcareprovider: "current_healthcareprovider",
    current_phone: "current_phone",
    current_hospital: "current_hospital",
  };

  useEffect((lastName, isDoctorLoggedIn) => {
    axios.get(`${API_BASE_URL}/articles/`).then((res) => {
      setArticles(res.data.newArticles);
    });
    axios.get(`${API_BASE_URL}/users/getDoctors`).then((res) => {
      localStorage.setItem("curr_doctors", res.data);
      setDoctorsList(res.data);
    });
    fetchAlerts();
    {
      isDoctorLoggedIn && fetchAlerts();
      setTimeout(() => setIsAlertLoading(false), 6000);
    }
  }, []);

  const fetchAlerts = async () => {
    setIsAlertLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/getAlarmingPatients`,
        {
          params: { lastName },
        }
      );
      const alerts = response.data;

      const sortedAlerts = alerts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      setAlerts(sortedAlerts);
    } catch (error) {
      setAlertError(error);
    }
    setIsAlertLoading(false);
  };

  useEffect(() => {
    axios.post(`${API_BASE_URL}/users/addDoctor`).then((res) => {});
  }, [doctorsList]);

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
    setCreateaccsuccess("");
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

  function handleOnHospitalChange(val) {
    localStorage.setItem("current_hospital", val);
    setHospital(val);
  }

  function handleOnPhoneChange(val) {
    localStorage.setItem("current_phone", val);
    setPhone(val);
  }

  const getProfileInfo = async (key, id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/getprofileinfo`, {
        params: { key, id },
      });
      return response.data.key;
    } catch (err) {}
  };

  const handleProfileInfoChange = async (key, value) => {
    var realKey = key.replace("current_", "");
    localStorage.setItem(key, value);
    switch (key) {
      case enumLocalStorageKeys.current_firstname:
        setFirstName(value);
        break;
      case enumLocalStorageKeys.current_lastname:
        setLastName(value);
        break;
      case enumLocalStorageKeys.current_email:
        setEmail(value);
        break;
      case enumLocalStorageKeys.current_draintype:
        setDraintype(value);
        break;
      case enumLocalStorageKeys.current_healthcareprovider:
        setHealthcareprovider(value);
        break;
      case enumLocalStorageKeys.current_phone:
        setPhone(value);
        break;
      case enumLocalStorageKeys.current_hospital:
        setHospital(value);
        break;
      default:
        break;
    }

    try {
      await axios.post(`${API_BASE_URL}/users/changeprofile`, {
        key: realKey,
        value: value,
        id: localStorage.getItem("current_user_id"),
      });
    } catch (err) {}
  };

  function handleOnCreateAccFormChange(key, val) {
    let newForm = {
      firstname: createAcc.firstname,
      lastname: createAcc.lastname,
      email: createAcc.email,
      password: createAcc.password,
      draintype: createAcc.draintype,
      drainsite: createAcc.drainsite,
      healthcareprovider: createAcc.healthcareprovider,
      isDoctor: false,
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

  const handleSignIn = async (signIn) => {
    try {
      setIsSignInLoading(true);
      const resp = await axios.post(`${API_BASE_URL}/users/login`, signIn);
      let user = resp.data;

      localStorage.setItem("current_user_id", user["objectId"]);
      localStorage.setItem("current_firstname", formatString(user.firstname));
      localStorage.setItem("current_lastname", formatString(user.lastname));
      localStorage.setItem("current_email", user.email);
      localStorage.setItem("current_draintype", user.draintype);
      localStorage.setItem("current_phone", user.phone);
      localStorage.setItem("current_hospital", user.hospital);
      localStorage.setItem(
        "current_healthcareprovider",
        user.healthcareprovider
      );
      if (user.isDoctor) {
        localStorage.setItem("current_doctor_id", user["objectId"]);
      }
      addAuthenticationHeader();

      setIsDoctorLoggedIn(user.isDoctor);
      setIsLoggedIn(true);
      setSigninerror("");
      setFirstName(formatString(resp.data.firstname));
      setLastName(formatString(resp.data.lastname));
      setEmail(resp.data.email);
      setPhone(resp.data.phone);
      setHospital(resp.data.hospital);
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
    setIsSignInLoading(false);
  };

  const handleOnSignInSubmit = async (signIn) => {
    if (!signIn.email || !signIn.password) {
      setSigninerror("Please fill out all fields.");
      return;
    }

    if (!signIn.email.includes("@") || !signIn.email.includes(".")) {
      setSigninerror("Please enter a valid email.");
      return;
    }

    await handleSignIn(signIn);
  };

  const handleCreateAcc = async (createAcc) => {
    try {
      setIsSignInLoading(true);
      await axios.post(`${API_BASE_URL}/users/register`, createAcc);
      setCreateaccsuccess(
        "Success! You can now sign in with your email and password."
      );
      setCreateAcc({});
    } catch (err) {
      setCreateaccerror(
        "Account already exists for that email. Please try again."
      );
    }
    setIsSignInLoading(false);
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

    await handleCreateAcc(createAcc);
  };

  const handleOnLogOut = async () => {
    try {
      await axios.post(`${API_BASE_URL}/users/logout`);
      localStorage.removeItem("current_user_id");
      localStorage.removeItem("current_doctor_id");
      localStorage.removeItem("current_firstname");
      localStorage.removeItem("current_lastname");
      localStorage.removeItem("current_email");
      localStorage.removeItem("current_draintype");
      localStorage.removeItem("current_healthcareprovider");
      localStorage.removeItem("current_phone");
      localStorage.removeItem("current_hospital");
      axios.defaults.headers.common = {};
      setIsLoggedIn(false);
      setIsDoctorLoggedIn(false);
    } catch (err) {}
  };

  const handleFacebookLogin = async (infoUser, response, first, last) => {
    try {
      setIsSignInLoading(true);
      const loginInfo = await axios.post(
        `${API_BASE_URL}/users/fblogin`,
        infoUser
      );

      let user = loginInfo.data;
      localStorage.setItem("current_user_id", user["objectId"]);
      localStorage.setItem("current_firstname", formatString(first));
      localStorage.setItem("current_lastname", formatString(last));
      localStorage.setItem("current_email", infoUser.email);
      const currDrain = await getProfileInfo(
        "draintype",
        localStorage.getItem("current_user_id")
      );
      const currHealthcareprovider = await getProfileInfo(
        "healthcareprovider",
        localStorage.getItem("current_user_id")
      );

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
      setHealthcareprovider(localStorage.getItem("current_healthcareprovider"));
      setIsSignInOpen(false);
    } catch (err) {}
    setIsSignInLoading(false);
  };

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
      await handleFacebookLogin(infoUser, response, first, last);
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
                isSignInLoading ? (
                  <Loading />
                ) : (
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
                    lastName={lastName}
                    createaccerror={createaccerror}
                    createaccsuccess={createaccsuccess}
                    signinerror={signinerror}
                    handleFacebookLoginResponse={handleFacebookLoginResponse}
                    articles={articles}
                    userId={localStorage.getItem("current_user_id")}
                    doctorsList={doctorsList}
                    isDoctorLoggedIn={isDoctorLoggedIn}
                    numAlerts={alerts.length}
                  />
                )
              }
            />
            <Route
              path="/data"
              element={
                isDoctorLoggedIn ? null : (
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
                    userId={localStorage.getItem("current_user_id")}
                    isDoctorLoggedIn={isDoctorLoggedIn}
                  />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isDoctorLoggedIn ? (
                  <DoctorProfile
                    handleSignInOpen={handleSignInOpen}
                    isLoggedIn={isLoggedIn}
                    handleCreateAccOpen={handleCreateAccOpen}
                    firstname={firstName}
                    lastname={lastName}
                    email={email}
                    handleOnLogOut={handleOnLogOut}
                    handleProfileInfoChange={handleProfileInfoChange}
                    isDoctorLoggedIn={isDoctorLoggedIn}
                    phone={phone}
                    hospital={hospital}
                    handleOnHospitalChange={handleOnHospitalChange}
                    handleOnPhoneChange={handleOnPhoneChange}
                  />
                ) : (
                  <Profile
                    isLoggedIn={isLoggedIn}
                    handleSignInOpen={handleSignInOpen}
                    handleCreateAccOpen={handleCreateAccOpen}
                    firstname={firstName}
                    lastname={lastName}
                    email={email}
                    phone={phone}
                    hospital={hospital}
                    draintype={draintype}
                    healthcareprovider={healthcareprovider}
                    handleOnLogOut={handleOnLogOut}
                    handleOnDrainTypeChange={handleOnDrainTypeChange}
                    handleOnHealthcareProviderChange={
                      handleOnHealthcareProviderChange
                    }
                    handleProfileInfoChange={handleProfileInfoChange}
                    doctorsList={doctorsList}
                    isDoctorLoggedIn={isDoctorLoggedIn}
                  />
                )
              }
            />
            <Route
              path="/troubleshooting"
              element={
                <Troubleshooting
                  handleSignInOpen={handleSignInOpen}
                  handleCreateAccOpen={handleCreateAccOpen}
                  isLoggedIn={isLoggedIn}
                  draintype={draintype}
                  isDoctorLoggedIn={isDoctorLoggedIn}
                />
              }
            />
            <Route
              path="/datalog"
              element={
                isDoctorLoggedIn ? null : (
                  <DataLog
                    isLoggedIn={isLoggedIn}
                    handleSignInOpen={handleSignInOpen}
                    handleCreateAccOpen={handleCreateAccOpen}
                    id={localStorage.getItem("current_user_id")}
                    isDoctorLoggedIn={isDoctorLoggedIn}
                  />
                )
              }
            />
            <Route
              path="/articles/BZyvCrvxMW"
              element={
                <PalliativeCare
                  isLoggedIn={isLoggedIn}
                  handleSignInOpen={handleSignInOpen}
                  handleCreateAccOpen={handleCreateAccOpen}
                  id={localStorage.getItem("current_user_id")}
                />
              }
            />
            <Route
              path="/articles/lL39fKTOXF"
              element={
                <GeneralCare
                  isLoggedIn={isLoggedIn}
                  handleSignInOpen={handleSignInOpen}
                  handleCreateAccOpen={handleCreateAccOpen}
                  id={localStorage.getItem("current_user_id")}
                />
              }
            />
            <Route
              path="/articles/sr435DsqF6"
              element={
                <Biliary
                  isLoggedIn={isLoggedIn}
                  handleSignInOpen={handleSignInOpen}
                  handleCreateAccOpen={handleCreateAccOpen}
                  id={localStorage.getItem("current_user_id")}
                />
              }
            />
            <Route
              path="/allpatients"
              element={
                isDoctorLoggedIn ? (
                  <AllPatients
                    isDoctorLoggedIn={isDoctorLoggedIn}
                    isLoggedIn={isLoggedIn}
                    handleSignInOpen={handleSignInOpen}
                    handleCreateAccOpen={handleCreateAccOpen}
                    lastName={lastName}
                  />
                ) : null
              }
            />
            <Route
              path="/alerts"
              element={
                isDoctorLoggedIn ? (
                  <Alerts
                    isDoctorLoggedIn={isDoctorLoggedIn}
                    isLoggedIn={isLoggedIn}
                    handleSignInOpen={handleSignInOpen}
                    handleCreateAccOpen={handleCreateAccOpen}
                    lastName={lastName}
                    alerts={alerts}
                    isAlertLoading={isAlertLoading}
                    alertError={alertError}
                    setAlerts={setAlerts}
                  />
                ) : null
              }
            />
            <Route
              path="/viewpatient/:userId/:firstname/:lastname"
              element={
                isDoctorLoggedIn ? (
                  <ViewPatient
                    isDoctorLoggedIn={isDoctorLoggedIn}
                    isLoggedIn={isLoggedIn}
                    handleSignInOpen={handleSignInOpen}
                    handleCreateAccOpen={handleCreateAccOpen}
                  />
                ) : null
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
