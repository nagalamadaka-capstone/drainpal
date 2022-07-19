import React from "react";
import NavBar from "../../NavBar/NavBar";
import "./DataLog.css";
import { useState } from "react";
import Slider from "./slider";
import axios from "axios";
import {Link} from "react-router-dom";

function DataLog({ handleSignInOpen, handleCreateAccOpen, isLoggedIn, id }) {
  const date = new Date().toDateString();
  const [isLogSymptomsOpen, setIsLogSymptomsOpen] = useState(false);
  const sliderArray = [
    "pain",
    "sleeping",
    "nausea",
    "bowels",
    "appetite",
    "breathing",
    "fatigue",
  ];
  const [sliderArrayValues, setSliderArrayValues] = useState([
    5, 5, 5, 5, 5, 5, 5,
  ]);
  const [symptoms, setSymptoms] = useState("");
  const [concerns, setConcerns] = useState("");
  const [drainOutput, setDrainOutput] = useState("");
  const [drainColor, setDrainColor] = useState("");
  const [drainOutputPhoto, setDrainOutputPhoto] = useState("");
  const [drainSkinSitePhoto, setDrainSkinSitePhoto] = useState("");
  const [dataLogError, setDataLogError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const API_BASE_URL = "http://localhost:3001";

  function onLogSymptomsClick() {
    setIsLogSymptomsOpen(!isLogSymptomsOpen);
  }

  const onSaveDataClick = async() => {
    if (!drainOutput || !drainColor) {
      setDataLogError("Please fill out all required fields before saving.");
      setSuccessMessage("");
    } else {
      const infoUser = {
        id: id,
        symptoms: symptoms ,
        concerns: concerns ,
        drainOutput: drainOutput,
        drainColor: drainColor,
        drainOutputPhoto: drainOutputPhoto,
        drainSkinSitePhoto: drainSkinSitePhoto,
        date: date,
        sliderArrayValues: sliderArrayValues,
        sliderArray: sliderArray,
      };
      try {
        const response = await axios.post(`${API_BASE_URL}/datalogs/save`, infoUser);
        setSuccessMessage(response.data);
        console.log(response.data);
      } catch (err) {}
      setSymptoms("");
      setConcerns("");
      setDrainOutput("");
      setDrainColor("");
      setDrainOutputPhoto("");
      setDrainSkinSitePhoto("");
      setDataLogError("");
      setSliderArrayValues([5, 5, 5, 5, 5, 5, 5]);
    }
  }

  const onSliderChange = (e, sliderNumber) => {
    setSliderArrayValues(
      sliderArrayValues.map((value, index) => {
        if (index === sliderNumber) {
          return e;
        }
        return value;
      })
    );
  };

  const onSymptomsChange = (e) => {
    setSymptoms(e.target.value);
  };

  const onConcernsChange = (e) => {
    setConcerns(e.target.value);
  };

  const onDrainOutputChange = (e) => {
    setDrainOutput(e.target.value);
  };

  const onDrainColorChange = (e) => {
    setDrainColor(e.target.value);
  };

  const onDrainOutputPhotoChange = (e) => {
    setDrainOutputPhoto(e.target.value);
  };

  const onDrainSkinSitePhotoChange = (e) => {
    setDrainSkinSitePhoto(e.target.value);
  };

  return (
    <div className="dataLog">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
      />
      <div className="notNavBar">
        <div className="wrapper">
          <h1>Data Log</h1>
          <h2>{date}</h2>
          <h3>How are you feeling today?</h3>
          {isLogSymptomsOpen ? (
            <div className="logsymptoms">
              <div className="rating-scale">
                {" "}
                0 = absent 10 = worst possible
              </div>
              <h2>Please rate your:</h2>
              <h3>distress from pain</h3>
              <Slider onSliderChange={onSliderChange} sliderNumber={0} />
              <h3>distress from difficulty sleeping</h3>
              <Slider onSliderChange={onSliderChange} sliderNumber={1} />
              <h3>distress from nausea</h3>
              <Slider onSliderChange={onSliderChange} sliderNumber={2} />
              <h3>distress from bowels</h3>
              <Slider onSliderChange={onSliderChange} sliderNumber={3} />
              <h3>distress from appetite</h3>
              <Slider onSliderChange={onSliderChange} sliderNumber={4} />
              <h3>distress from diffulty breathing</h3>
              <Slider onSliderChange={onSliderChange} sliderNumber={5} />
              <h3>distress from fatigue</h3>
              <Slider onSliderChange={onSliderChange} sliderNumber={6} />
              <h2>Do you have any other symptoms?</h2>
              <input
                type="text"
                className="logsymptoms-input"
                onChange={(e) => onSymptomsChange(e)}
                value={symptoms}
              />

              <h2>Do you have any concerns about your drain?</h2>
              <input
                type="text"
                className="logsymptoms-input"
                onChange={(e) => onConcernsChange(e)}
                value = {concerns}
              />
            </div>
          ) : null}
          <button className="log-symptoms" onClick={() => onLogSymptomsClick()}>
            {isLogSymptomsOpen ? "Save" : "Log Symptoms"}
          </button>
          <h3>Drain output amount in mL *</h3>
          <input
            type="text"
            className="datalog-input"
            placeholder="e.g. 100"
            onChange={(e) => onDrainOutputChange(e)}
            value = {drainOutput}
          />
          <h3>Drain output color *</h3>
          <input
            type="text"
            className="datalog-input"
            placeholder="e.g. yellowish green"
            onChange={(e) => onDrainColorChange(e)}
            value = {drainColor}
          />
          <h3>Drain output photo</h3>
          <input
            type="file"
            className="datalog-choose-file"
            placeholder="Drain output photo"
            onChange={(e) => onDrainOutputPhotoChange(e)}
          />
          <h3>Drain skin site photo</h3>
          <input
            type="file"
            className="datalog-choose-file"
            placeholder="Drain skin site photo"
            onChange={(e) => onDrainSkinSitePhotoChange(e)}
          />
          {dataLogError ? (
            <h2 className="error-message">{dataLogError}</h2>
          ) : null}
          {successMessage ? (
            <div className="success-message-wrapper">
                <h2 className="success-message">{successMessage}</h2>
                <Link to = "/data"><button className="save-data-log">Go back to data home!</button></Link>
            </div>
            ) : null}
          <button className="save-data-log" onClick={() => onSaveDataClick()}>
            Save Data Log
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataLog;
