import React from "react";
import "./Banner.css";
import { RiQuestionnaireLine } from "react-icons/ri";
import {Link} from "react-router-dom";

function TroubleshootingButton() {
  return (
    <div>
      <Link to="/troubleshooting">
        <button>
          <div className="buttonFormat">
            <div className="icon">
              <RiQuestionnaireLine
                style={{
                  width: "2.7rem",
                  height: "2.7rem",
                }}
              />
            </div>
            <div className="notIcon">
              Need help with your drain? Troubleshoot here!
            </div>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default TroubleshootingButton;
