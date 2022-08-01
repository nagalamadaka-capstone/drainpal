import React from "react";
import NavBar from "../../NavBar/NavBar";
import "./DataLog.css";
import { useState } from "react";
import Slider from "./slider";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChromePicker } from "react-color";
import base64ArrayBuffer from "../../../base64ArrayBuffer";
import { IMAGGAAPIKEY, IMAGGASECRET } from "../../../securitykeys";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

function DataLog({
  handleSignInOpen,
  handleCreateAccOpen,
  isLoggedIn,
  id,
  isDoctorLoggedIn,
}) {
  const date = new Date().toDateString();
  const time = new Date().toLocaleTimeString();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [currColor, setCurrColor] = useState("#e5e5e5");
  const [colorsInPic, setColorsInPic] = useState([]);
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
  const [isColorLoading, setIsColorLoading] = useState(false);
  const API_BASE_URL = "http://localhost:3001";

  function onLogSymptomsClick() {
    setIsLogSymptomsOpen(!isLogSymptomsOpen);
  }

  function handleClickColor() {
    setDisplayColorPicker(!displayColorPicker);
  }

  function handleColorChange(e) {
    setCurrColor(e.hex);
    setDrainColor(e.hex);
  }

  const onDrainOutputPhotoChange = async (e) => {
    const buffer = await e.target.files[0].arrayBuffer();
    const base64 = base64ArrayBuffer(buffer);
    setDrainOutputPhoto(base64);
  };

  const onDrainOutputPhotoSave = async () => {
    setIsColorLoading(true);
    try {
      const response1 = await axios.post(`${API_BASE_URL}/datalogs/savePhoto`, {
        photo: drainOutputPhoto,
        id: id,
      });

      await extractColors(response1.data);
      setDataLogError("");
    } catch (error) {
      setDataLogError("Error uploading photo. Try again.");
    }
    setIsColorLoading(false);
  };

  const extractColors = async (response1) => {
    const { photoObject } = response1;
    const { photo } = photoObject;

    try {
      const response = await axios.get(`${API_BASE_URL}/datalogs/colors`, {
        params: {
          parseLink: photo.url,
          IMAGGAAPIKEY,
          IMAGGASECRET,
        },
      });
      const result = response.data.result;
      const colors = result.colors;
      const { foreground_colors } = colors;
      const foregroundColorsInPic = [];

      {
        foreground_colors.map((foreground_color) => {
          if (
            !foregroundColorsInPic.includes(
              foreground_color.closest_palette_color_html_code
            )
          ) {
            foregroundColorsInPic.push(
              foreground_color.closest_palette_color_html_code
            );
          }
        });
        setColorsInPic(foregroundColorsInPic);
      }

      const { image_colors } = colors;
      const imageColorsInPic = [];

      {
        image_colors.map((image_color) => {
          if (
            !colorsInPic.includes(
              image_color.closest_palette_color_html_code
            ) &&
            !foregroundColorsInPic.includes(
              image_color.closest_palette_color_html_code
            )
          ) {
            imageColorsInPic.push(image_color.closest_palette_color_html_code);
          }
        });
      }
      setColorsInPic([...imageColorsInPic, ...foregroundColorsInPic]);
    } catch (err) {
      setDataLogError("Error extracting colors. Try again.");
    }
  };

  const onSaveDataClick = async () => {
    if (!drainOutput) {
      setDataLogError("Please fill out all required fields before saving.");
      setSuccessMessage("");
    } else {
      const response = await axios.get(`${API_BASE_URL}/datalogs/check`, {
        params: {
          userId: id,
          date: date,
        },
      });

      if (response.data === "true" || response.data === true) {
        setDataLogError(
          "You have already logged data for this day. Try again tomorrow."
        );
        setSuccessMessage("");
      } else {
        const infoUser = {
          id: id,
          symptoms: symptoms,
          concerns: concerns,
          time: time,
          drainOutput: drainOutput,
          drainColor: drainColor,
          drainOutputPhoto: drainOutputPhoto,
          drainSkinSitePhoto: drainSkinSitePhoto,
          date: date,
          sliderArrayValues: sliderArrayValues,
          sliderArray: sliderArray,
        };

        try {
          const response = await axios.post(
            `${API_BASE_URL}/datalogs/save`,
            infoUser
          );
          setSuccessMessage(response.data);
        } catch (err) {}
        resetStates();
      }
    }
  };

  const resetStates = () => {
    setSymptoms("");
    setConcerns("");
    setDrainOutput("");
    setDrainColor("");
    setDrainOutputPhoto("");
    setDrainSkinSitePhoto("");
    setDataLogError("");
    setSliderArrayValues([5, 5, 5, 5, 5, 5, 5]);
    setColorsInPic([]);
  };

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

  const onTextChange = (e, setText) => {
    setText(e.target.value);
  }

  return (
    <div className="dataLog">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        isDoctorLoggedIn={isDoctorLoggedIn}
      />
      <div className="notNavBar">
        <div className="wrapper">
          <div className="dataLog-header">
            <h1>Data Log</h1>
            <h2>{date}</h2>
            <h3>How are you feeling today?</h3>
          </div>
          {isLogSymptomsOpen ? (
            <div className="logsymptoms">
              <div className="rating-scale">
                {" "}
                0 = absent 10 = worst possible
              </div>
              <h2>Please rate your:</h2>
              {sliderArray.map((slider, index) => {
                return (
                  <div className="slider-container">
                    <h3>distress from {slider}</h3>
                    <Slider
                      onSliderChange={onSliderChange} sliderNumber={index}
                    />
                  </div>
                );
              }
              )}
              <h2>Do you have any other symptoms?</h2>
              <input
                type="text"
                className="datalog-input"
                onChange={(e) => onTextChange(e, setSymptoms)}
                value={symptoms}
              />

              <h2>Do you have any concerns about your drain?</h2>
              <input
                type="text"
                className="datalog-input"
                onChange={(e) => onTextChange(e, setConcerns)}
                value={concerns}
              />
            </div>
          ) : null}
          <div className="dataLog-main">
            <button
              className="log-symptoms"
              onClick={() => onLogSymptomsClick()}
            >
              {isLogSymptomsOpen ? "Save" : "Log Symptoms"}
            </button>
            <h3>
              Drain output amount in mL <span className="red">*</span>
            </h3>
            <input
              type="text"
              className="datalog-input"
              placeholder="e.g. 100"
              onChange={(e) => onTextChange(e, setDrainOutput)}
              value={drainOutput}
            />
            <h3>
              Drain output color <span className="red">*</span>
            </h3>

            <h4>Either pick color or upload photo to detect color. </h4>
            {displayColorPicker ? (
              <div>
                <ChromePicker
                  color={currColor}
                  onChange={(e) => handleColorChange(e)}
                />
                <button
                  className="log-symptoms"
                  onClick={() => handleClickColor()}
                >
                  Save Color
                </button>
              </div>
            ) : (
              <div>
                <div
                  className="exampleColor"
                  style={{ backgroundColor: `${currColor}` }}
                ></div>
                <button
                  className="log-symptoms"
                  onClick={() => handleClickColor()}
                >
                  Pick Color
                </button>
              </div>
            )}
            <input
              type="file"
              className="datalog-choose-file"
              onChange={(e) => onDrainOutputPhotoChange(e)}
            />
            <button
              className="log-symptoms"
              onClick={() => onDrainOutputPhotoSave()}
            >
              Find Colors in Photo
            </button>
            {isColorLoading ? <LoadingSpinner /> : null}
            {colorsInPic != "" ? (
              <div className="colorOptions-container">
                <h4>Choose a color below</h4>
                <div className="colorOptions">
                  {colorsInPic.map((color) => (
                    <div
                      key={color}
                      className="colorsFromPic"
                      style={{ backgroundColor: `${color}` }}
                      onClick={() => setCurrColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
            ) : null}

            {dataLogError ? (
              <h2 className="error-message">{dataLogError}</h2>
            ) : null}
            {successMessage ? (
              <div className="success-message-wrapper">
                <h2 className="success-message">{successMessage}</h2>
                <Link to="/data">
                  <button className="save-data-log">
                    Go back to data home!
                  </button>
                </Link>
              </div>
            ) : null}
            <button className="save-data-log" onClick={() => onSaveDataClick()}>
              Save Data Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataLog;
