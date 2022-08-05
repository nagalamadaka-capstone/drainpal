import React from "react";
import NavBar from "../../NavBar/NavBar";
import "./DataLog.css";
import { useState } from "react";
import Slider from "./slider";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChromePicker } from "react-color";
import {
  IMAGGAAPIKEY,
  IMAGGASECRET,
} from "../../../securitykeys";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../firebase";
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
  const [drainHSL, setDrainHSL] = useState("");
  const [drainOutputFile, setDrainOutputFile] = useState(null);
  const [drainSkinSitePhoto, setDrainSkinSitePhoto] = useState("");
  const [dataLogError, setDataLogError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [percentUploaded, setPercentUploaded] = useState("");
  const [drainOutputPhotoLink, setDrainOutputPhotoLink] = useState("");
  const [isColorLoading, setIsColorLoading] = useState(false);
  const API_BASE_URL = "http://localhost:3001";

  function onLogSymptomsClick() {
    setIsLogSymptomsOpen(!isLogSymptomsOpen);
  }

  function handleClickColor() {
    setDisplayColorPicker(!displayColorPicker);
  }

  function handleSelectColor(color) {
    setCurrColor(color);
    setDrainColor(color);
    setDrainHSL(hexToHSL(color));
  }

  function handleColorChange(e) {
    setCurrColor(e.hex);
    setDrainColor(e.hex);
    setDrainHSL([e.hsl.h, e.hsl.s, e.hsl.l]);
  }

  function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0,
      g = 0,
      b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
  }

  const onDrainOutputPhotoChange = async (e) => {
    setDrainOutputFile(e.target.files[0]);
  };

  const onDrainOutputPhotoSave = async () => {
    setIsColorLoading(true);

    const imageRef = ref(storage, `images/${drainOutputFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, drainOutputFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
        setPercentUploaded(percent);
      },
      (error) => {
        setDataLogError("Error uploading photo. Try again.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDrainOutputPhotoLink(url);
          extractColors(url);
        });
      }
    );
    setDataLogError("");
  };

  const extractColors = async (link) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/datalogs/colors`, {
        params: {
          parseLink: link,
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
    setIsColorLoading(false);
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
          drainHSL: drainHSL,
          drainOutputPhotoLink: drainOutputPhotoLink,
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
    setDrainHSL("");
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
  };

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
                      onSliderChange={onSliderChange}
                      sliderNumber={index}
                    />
                  </div>
                );
              })}
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

            <h4>Upload photo to detect color.</h4>
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
            {isColorLoading ? (
              <p>Picture is {percentUploaded}% done uploading</p>
            ) : null}
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
                      onClick={() => handleSelectColor(color)}
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
