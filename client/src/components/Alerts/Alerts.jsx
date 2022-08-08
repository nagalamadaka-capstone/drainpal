import React from "react";
import NavBar from "../NavBar/NavBar";
import "../AllPatients/AllPatients.css";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useState } from "react";

const API_BASE_URL = "http://localhost:3001";

function Alerts({
  isLoggedIn,
  handleSignInOpen,
  handleCreateAccOpen,
  lastName,
  alerts,
  isDoctorLoggedIn,
  isAlertLoading,
  alertError,
  setAlerts,
}) {
  const [checked, setChecked] = useState(false);
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function handleCheckChange() {
    let today = new Date().toDateString();

    if (checked) {
      const newAlerts = [...alerts];
      setFilteredAlerts(newAlerts.filter((alert) => alert.date === today));
    } else {
      setFilteredAlerts([]);
    }
    setChecked(!checked);
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
              <div className="checkboxContainer">
                <h2>only show today's alerts</h2>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckChange}
                />
              </div>
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
                  {checked ? (
                    filteredAlerts.length > 0 ? (
                      filteredAlerts.map((alert) => (
                        <tr key={alert.id}>
                          <td>
                            <Link
                              to={`/viewpatient/${
                                alert.patientId
                              }/${capitalizeName(
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No alerts found.</td>
                      </tr>
                    )
                  ) : (
                    alerts.map((alert) => (
                      <tr key={alert.time}>
                        {}
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
                    ))
                  )}
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
