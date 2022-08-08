import React from "react";
import { Link } from "react-router-dom";

function TemplateBannerButton({ linkAddress, buttonText, icon }) {
  return (
    <div className="templateBanner">
      <Link to={linkAddress}>
        <button>
          <div className="buttonFormat">
            <div className="icon">{icon}</div>
            <div className="notIcon">{buttonText}</div>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default TemplateBannerButton;
