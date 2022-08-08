import React from "react";
import NavBar from "../NavBar/NavBar";
import "../AllPatients/AllPatients.css";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const API_BASE_URL = "http://localhost:3001";

function Alerts({
  isLoggedIn,
  handleSignInOpen,
  handleCreateAccOpen,
  lastName,
  alerts,
  isDoctorLoggedIn,
  isAlertLoading,
  alertError
}) {

  function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <div className="allPatients">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        isDoctorLoggedIn={isDoctorLoggedIn}
      />
      <div className="notNavBar">
        <div className="wrapper">
          <h1>Alerts</h1>
          {alertError ? <p>{alertError}</p> : null}
          {isAlertLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="all-patients-container">
              <table className="patient-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Drain Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Color</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => (
                    <tr key={alert.time}>
                      <td>
                        <Link
                          to={`/viewpatient/${alert.id}/${capitalizeName(
                            alert.firstname
                          )}/${capitalizeName(alert.lastname)}`}
                        >
                          {" "}
                          {capitalizeName(alert.firstname) +
                            " " +
                            capitalizeName(alert.lastname)}
                        </Link>
                      </td>

                      <td>{alert.draintype}</td>
                      <td>{alert.date}</td>
                      <td>{alert.time}</td>
                      <td>
                        <div
                          className="exampleColorVP"
                          style={{ backgroundColor: `${alert.drainColor}` }}
                        ></div>
                      </td>
                      <td>{alert.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
