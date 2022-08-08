import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { TbAlertCircle } from "react-icons/tb";
import { useState, useEffect } from "react";
import TroubleshootingButton from "./TroubleshootingButton";
import { IoMdCreate } from "react-icons/io";
import { GoSignIn } from "react-icons/go";
import { AiOutlineLineChart } from "react-icons/ai";
import TemplateBannerButton from "./TemplateBannerButton";

function Banner({
  handleSignInOpen,
  handleCreateAccOpen,
  isLoggedIn,
  firstName,
  lastName,
  userId,
  isDoctorLoggedIn,
  numAlerts,
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
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="banner">
      {isLoggedIn ? (
        <div className="bannerLoggedIn">
          {isDoctorLoggedIn ? (
            <h1>Welcome, Dr. {lastName}</h1>
          ) : (
            <h1>Welcome, {firstName}</h1>
          )}
          <h2>
            DrainPal is a tool for users to track their pain levels due to a
            Percutaneous Nephrostomy Tube.
          </h2>
          <div className="bannerButtonContainer">
            {isDoctorLoggedIn ? (
              <div className="buttonFormatBanner">
                <TemplateBannerButton
                  buttonText= {`You have ${numAlerts} alerts. Click here to view your most alarming patients.`}
                  linkAddress="/alerts"
                  icon={
                    <TbAlertCircle
                        style={{
                          width: "3rem",
                          height: "3rem",
                        }}
                      />
                  }
                />
                <TemplateBannerButton
                  buttonText="Click here to view your patients' drain data and pain levels."
                  linkAddress="/allpatients"
                  icon={
                    <AiOutlineLineChart
                      style={{
                        width: "2.7rem",
                        height: "2.7rem",
                      }}
                    />
                  }
                />
                <TroubleshootingButton />
                
              </div>
            ) : (
              <TroubleshootingButton />
            )}
            {isDoctorLoggedIn ? null : hasLoggedData ? null : (
              <TemplateBannerButton
                buttonText={`${firstName}, click here to log your data for today.`}
                linkAddress="/datalog"
                icon={<IoMdCreate style={{ width: "2.7rem", height: "2.7rem" }} />}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="bannerNotLoggedIn">
          <h1>Welcome!</h1>
          <h2>
            DrainPal is a tool for users to track their pain levels due to a
            Percutaneous Nephrostomy Tube.
          </h2>
          <div className="signupbuttons">
            <button
              className="menu-signin"
              onClick={() => handleSignInOpen()}
              style={{ fontSize: "20px" }}
            >
              <div className="buttonFormatBanner">
                <GoSignIn
                  style={{ width: "2rem", height: "2rem", marginRight: "5px" }}
                />
                Sign In
              </div>
            </button>
            <button
              className="menu-createacc"
              onClick={() => handleCreateAccOpen()}
              style={{ fontSize: "20px" }}
            >
              <div className="buttonFormatBanner">
                <IoMdCreate
                  style={{
                    width: "2.5rem",
                    height: "2rem",
                    marginBottom: "0px",
                  }}
                />
                Create Account
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
