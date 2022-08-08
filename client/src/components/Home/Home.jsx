import React from "react";
import Banner from "./Banner/Banner";
import "./Home.css";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Sidebar/Sidebar";

function Home({
  handleSignInOpen,
  handleCreateAccOpen,
  isLoggedIn,
  createAcc,
  signIn,
  handleOnCreateAccFormChange,
  handleOnSignInFormChange,
  isSignInOpen,
  isCreateAccOpen,
  handleOnSignInSubmit,
  handleOnCreateAccSubmit,
  firstName,
    lastName,
  createaccerror,
  signinerror,
  handleFacebookLoginResponse,
  articles,
  userId,
  createaccsuccess,
  doctorsList,
  isDoctorLoggedIn,
  numAlerts,
}) {
  return (
    <div className="home">
      <Sidebar
        isSignInOpen={isSignInOpen}
        isCreateAccOpen={isCreateAccOpen}
        createAcc={createAcc}
        handleOnCreateAccFormChange={handleOnCreateAccFormChange}
        handleCreateAccOpen={handleCreateAccOpen}
        handleSignInOpen={handleSignInOpen}
        handleOnSignInFormChange={handleOnSignInFormChange}
        signIn={signIn}
        handleOnSignInSubmit={handleOnSignInSubmit}
        handleOnCreateAccSubmit = {handleOnCreateAccSubmit}
        createaccerror = {createaccerror}
        createaccsuccess = {createaccsuccess}
        signinerror = {signinerror}
        handleFacebookLoginResponse = {handleFacebookLoginResponse}
        doctorsList = {doctorsList}
      />
      <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        isDoctorLoggedIn = {isDoctorLoggedIn}
      />
      <div className="notNavBar">
        <Banner
          handleSignInOpen={handleSignInOpen}
          handleCreateAccOpen={handleCreateAccOpen}
          isLoggedIn={isLoggedIn}
          firstName={firstName}
          lastName={lastName}
          userId={userId}
          isDoctorLoggedIn = {isDoctorLoggedIn}
          numAlerts={numAlerts}
        />
        <div className="generalInfoWrapper">
            {articles.map(article => {
            return (
                <GeneralInfo
                article={article}
            />
            )
            }
            )}
        </div>
        
      </div>
    </div>
  );
}

export default Home;
