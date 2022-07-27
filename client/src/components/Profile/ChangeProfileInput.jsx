import React from "react";
import "./Profile.css";
import { useState } from "react";

function ChangeProfileInput({
  componentName,
  component,
  handleComponentChange,
  currComponentName,
  handleProfileInfoChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleOnClick = () => {
    if (componentName === "phone") {
      if (
        component.includes("-") ||
        component.includes("/") ||
        component.includes(" ")
      ) {
        component = component.replace(/[-/\s]/g, "");
      }
      if (component.length != 10) {
        setError("Phone number must be 10 digits long");
      } else {
        setError("");
        if (isOpen) {
          handleProfileInfoChange(currComponentName, component);
        }
      }
    } else {
      if (isOpen) {
        handleProfileInfoChange(currComponentName, component);
      }
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className="changing-profile-input">
      {error ? <p className="error">{error}</p> : null}
      {isOpen ? (
        <div className="change-component">
          <input
            type="text"
            placeholder={componentName}
            className="profile-input"
            onChange={(e) => handleComponentChange(e.target.value)}
            value={component}
          />
          <button className="add-drain" onClick={() => handleOnClick()}>
            Save
          </button>
        </div>
      ) : (
        <button className="add-drain" onClick={() => handleOnClick()}>
          Change {componentName}
        </button>
      )}
    </div>
  );
}

export default ChangeProfileInput;
