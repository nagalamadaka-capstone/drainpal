import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Troubleshooting.css";
import { useState } from "react";

function Troubleshooting({
  handleSignInOpen,
  handleCreateAccOpen,
  isLoggedIn,
  draintype,
  isDoctorLoggedIn,
}) {
  const [troubleshooting, setTroubleshooting] = useState({});

  function handleOnTroubleshootingChange(key, val) {
    let newForm = {
      draintype: troubleshooting.draintype,
      issue: troubleshooting.issue,
      changeInVolume: troubleshooting.changeInVolume,
      persistentIncrease: troubleshooting.persistentIncrease,
      persistentIncreaseChange: troubleshooting.persistentIncreaseChange,
      damaged: troubleshooting.damaged,
      flushing: troubleshooting.flushing,
      persistentDecrease: troubleshooting.persistentDecrease,
      drainconnections: troubleshooting.drainconnections,
      thinnerQuantityChange: troubleshooting.thinnerQuantityChange,
      changeInQuality: troubleshooting.changeInQuality,
      bloodThickness: troubleshooting.bloodThickness,
      thickBloodFainting: troubleshooting.thickBloodFainting,
      newPain: troubleshooting.newPain,
    };
    newForm[key] = val;
    setTroubleshooting(newForm);
  }

  return (
    <div className="troubleshooting">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        isDoctorLoggedIn={isDoctorLoggedIn}
      />
      <div className="notNavBar">
        <div className="wrapper">
          <h1>Troubleshooting</h1>
          <h2>Which drain is causing your concern?</h2>
          <select
            name="draintype"
            className="troubleshooting"
            value={troubleshooting.draintype}
            onChange={(e) => {
              handleOnTroubleshootingChange("draintype", e.target.value);
            }}
          >
            <option value="">Select a Drain Type</option>
            <option value="PCN">{draintype}</option>
          </select>
          {troubleshooting.draintype && (
            <div className="q2">
              <h2>What type of issue are you having?</h2>
              <select
                name="issue"
                className="troubleshooting-dropdown"
                value={troubleshooting.issue}
                onChange={(e) => {
                  handleOnTroubleshootingChange("issue", e.target.value);
                }}
              >
                <option value="">Select an Issue</option>
                <option value="volumeChange">
                  Change in the amount of output
                </option>
                <option value="quality">Change in the quality of output</option>
                <option value="newPain">
                  New pain associated with the drain
                </option>
              </select>
            </div>
          )}
          {troubleshooting.issue === "newPain" && (
            <div className="q3">
              <h2> When do you experience this pain?</h2>
              <select
                name="newPainWhen"
                className="troubleshooting-dropdown"
                value={troubleshooting.newPainWhen}
                onChange={(e) => {
                  handleOnTroubleshootingChange("newPainWhen", e.target.value);
                }}
              >
                <option value="">Select an Option</option>
                <option value="constantly">Constantly</option>
                <option value="onlyDrainFlush">
                  Only when the drain is flushed
                </option>
              </select>
            </div>
          )}
          {troubleshooting.newPainWhen === "constantly" && (
            <div className="q3">
              <h2> Is the pain mild/moderate in severity, 1-5 out of 10? </h2>
              <select
                name="newPainSeverity"
                className="troubleshooting-dropdown"
                value={troubleshooting.newPainSeverity}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "newPainSeverity",
                    e.target.value
                  );
                }}
              >
                <option value="">Select an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}
          {troubleshooting.newPainSeverity === "yes" && (
            <div className="q3">
              <h2>
                {" "}
                Does taking an over-the-counter or prescribed pain medication
                help ease the pain?{" "}
              </h2>
              <select
                name="newPainMedication"
                className="troubleshooting-dropdown"
                value={troubleshooting.newPainMedication}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "newPainMedication",
                    e.target.value
                  );
                }}
              >
                <option value="">Select an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}
          {troubleshooting.newPainMedication === "yes" && (
            <div className="q3">
              <h2>
                Continue to take the pain medication as safely as prescribed/recommended and monitor for 24hrs.
              </h2>
            </div>
          )}

          {troubleshooting.issue === "volumeChange" && (
            <div className="q3">
              <h2>How has it changed?</h2>
              <select
                name="changeInVolume"
                className="troubleshooting-dropdown"
                value={troubleshooting.changeInVolume}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "changeInVolume",
                    e.target.value
                  );
                }}
              >
                <option value="">Select a Change</option>
                <option value="increase">Sudden increase</option>
                <option value="decrease">Sudden decrease</option>
              </select>
            </div>
          )}
          {troubleshooting.changeInVolume === "increase" && (
            <div className="q4">
              <h2>
                Have you had persistent increased output for more than 24-48h?
              </h2>
              <select
                name="persistentIncrease"
                className="troubleshooting-dropdown"
                value={troubleshooting.persistentIncrease}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "persistentIncrease",
                    e.target.value
                  );
                }}
              >
                <option value="">Select a Change</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}
          {troubleshooting.persistentIncrease === "no" && (
            <div className="q6">
              <h2>Any changes in your health? Fever/pain?</h2>
              <select
                name="persistentIncreaseChange"
                className="troubleshooting-dropdown"
                value={troubleshooting.persistentIncreaseChange}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "persistentIncreaseChange",
                    e.target.value
                  );
                }}
              >
                <option value="">Select a Change</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}

          {troubleshooting.newPainWhen === "onlyDrainFlush" && (
            <div className="q6">
              <h2>Any changes in your health? Fever/pain?</h2>
              <select
                name="onlyDrainFlush"
                className="troubleshooting-dropdown"
                value={troubleshooting.onlyDrainFlush}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "onlyDrainFlush",
                    e.target.value
                  );
                }}
              >
                <option value="">Select a Change</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}

          {troubleshooting.changeInVolume === "decrease" && (
            <div className="q4">
              <h2>Any changes in your health? Fever/pain?</h2>
              <select
                name="persistentDecrease"
                className="troubleshooting-dropdown"
                value={troubleshooting.persistentDecrease}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "persistentDecrease",
                    e.target.value
                  );
                }}
              >
                <option value="">Select a Change</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}
          {troubleshooting.persistentDecrease === "no" && (
            <div className="q5">
              <h2>Is the drain pulled out completely / damaged?</h2>
              <select
                name="damaged"
                className="troubleshooting-dropdown"
                value={troubleshooting.damaged}
                onChange={(e) => {
                  handleOnTroubleshootingChange("damaged", e.target.value);
                }}
              >
                <option value="">Select a Change</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}
          {troubleshooting.damaged === "no" && (
            <div className="q5">
              <h2>
                Does it flush easily without leakage or pain upon flushing?
              </h2>
              <select
                name="flushing"
                className="troubleshooting-dropdown"
                value={troubleshooting.flushing}
                onChange={(e) => {
                  handleOnTroubleshootingChange("flushing", e.target.value);
                }}
              >
                <option value="">Select a Change</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}
          {troubleshooting.flushing === "no" && (
            <div className="q5">
              <h2>
                Are all the connections to the drain intact? Is the stopcock
                open?
              </h2>
              <select
                name="drainconnections"
                className="troubleshooting-dropdown"
                value={troubleshooting.drainconnections}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "drainconnections",
                    e.target.value
                  );
                }}
              >
                <option value="">Select an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}
          {troubleshooting.issue === "quality" && (
            <div className="q3">
              <h2>How has it changed?</h2>
              <select
                name="changeInQuality"
                className="troubleshooting-dropdown"
                value={troubleshooting.changeInQuality}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "changeInQuality",
                    e.target.value
                  );
                }}
              >
                <option value="">Select a Change</option>
                <option value="bloody">New Bloody Output</option>
                <option value="thinner">
                  Thinner, more see-through output
                </option>
              </select>
            </div>
          )}
          {troubleshooting.changeInQuality === "bloody" && (
            <div className="q3">
              <h2>What is the thickness of the output?</h2>
              <select
                name="bloodThickness"
                className="troubleshooting-dropdown"
                value={troubleshooting.bloodThickness}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "bloodThickness",
                    e.target.value
                  );
                }}
              >
                <option value="">Select a Thickness</option>
                <option value="thick-bloody">Thick, red, bloody output</option>
                <option value="see-through">
                  Blood-tinged, see-through output
                </option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
          {troubleshooting.bloodThickness === "thick-bloody" && (
            <div className="q3">
              <h2>
                Has it continued for more than 6h or have you experienced
                lightheadedness/fainting?
              </h2>
              <select
                name="thickBloodFainting"
                className="troubleshooting-dropdown"
                value={troubleshooting.thickBloodFainting}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "thickBloodFainting",
                    e.target.value
                  );
                }}
              >
                <option value="">Select an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}
          {(troubleshooting.changeInQuality === "thinner" ||
            troubleshooting.onlyDrainFlush === "no") && (
            <div className="q3">
              <h2>Is the drain output less than 20cc per day?</h2>
              <select
                name="thinnerQuantityChange"
                className="troubleshooting-dropdown"
                value={troubleshooting.thinnerQuantityChange}
                onChange={(e) => {
                  handleOnTroubleshootingChange(
                    "thinnerQuantityChange",
                    e.target.value
                  );
                }}
              >
                <option value="">Select an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}
          {(troubleshooting.persistentIncrease === "yes" ||
            troubleshooting.persistentIncreaseChange == "yes" ||
            troubleshooting.persistentDecrease === "yes" ||
            troubleshooting.damaged === "yes" ||
            troubleshooting.drainconnections === "yes" ||
            troubleshooting.bloodThickness === "see-through" ||
            troubleshooting.thickBloodFainting === "yes" ||
            troubleshooting.newPainSeverity === "no" ||
            troubleshooting.newPainMedication === "no" ||
            troubleshooting.onlyDrainFlush === "yes") && (
            <div className="q5">
              <h2>Call your provider.</h2>
              <button
                onClick={() => window.location.reload(false)}
                className="add-drain"
              >
                Start over!
              </button>
            </div>
          )}
          {(troubleshooting.persistentIncreaseChange === "no" ||
            troubleshooting.bloodThickness === "other" ||
            troubleshooting.thickBloodFainting === "no" ||
            troubleshooting.thinnerQuantityChange === "no") && (
            <div className="result2">
              <h2>Continue to monitor your drain for 24h.</h2>
              <button
                onClick={() => window.location.reload(false)}
                className="add-drain"
              >
                Start over!
              </button>
            </div>
          )}
          {(troubleshooting.flushing === "yes" ||
            troubleshooting.thinnerQuantityChange === "yes") && (
            <div className="q5">
              <h2>Your fluid collection may be fully drained.</h2>
              <h3>
                If your most recent two 24h drain output amounts have been less
                than 20cc, please call for assessment for possible drain
                removal.
              </h3>
              <h3>
                If your recent 24h drain output amounts have been more than 20cc
                please continue to monitor the output for the next 24h and
                repeat this troubleshooting.
              </h3>
              <button
                onClick={() => window.location.reload(false)}
                className="add-drain"
              >
                Start over!
              </button>
            </div>
          )}
          {troubleshooting.drainconnections === "no" && (
            <div className="q5">
              <h2>
                Please open all connectors and locks and try flushing again.
              </h2>
              <button
                onClick={() => window.location.reload(false)}
                className="add-drain"
              >
                Start over!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Troubleshooting;
