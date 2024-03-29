import React from "react";
import NavBar from "../NavBar/NavBar";
import "../AllPatients/AllPatients.css";
import "./Alerts.css";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import Calendar from "react-calendar";
import { AiOutlineCalendar } from "react-icons/ai";
import "react-calendar/dist/Calendar.css";
import { useEffect } from "react";
import TemplatePatientTable from "./TemplatePatientTable";

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
  const [isCalOpen, setIsCalOpen] = useState(false);

  function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function handleCheckChange() {
    let today = new Date().toDateString();

    setChecked(!checked);
    if (!checked) {
      const newAlerts = [...alerts];
      const newFilteredAlerts = [];
      newAlerts.forEach((alert) => {
        if (alert.date === today) {
          newFilteredAlerts.push(alert);
        }
      });
      setFilteredAlerts(newFilteredAlerts);
    } else {
      setFilteredAlerts([]);
    }
  }

  function handleCalendarOpen() {
    setIsCalOpen(!isCalOpen);

    if (!isCalOpen) {
    } else {
      setFilteredAlerts([]);
    }
  }

  useEffect(() => {}, [filteredAlerts]);

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
              <div className="viewOptions">
                <div className="checkboxContainer">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCheckChange()}
                  />
                  <h2>only show today's alerts</h2>
                </div>
                <div className="calendarContainer">
                  <div className="flex">
                    <h2>show certain dates</h2>
                    <AiOutlineCalendar
                      onClick={() => handleCalendarOpen()}
                      style={{
                        width: "2rem",
                        height: "2rem",
                        cursor: "pointer",
                        marginLeft: "0.75rem",
                      }}
                    />
                  </div>

                  {isCalOpen ? (
                    <Calendar
                      onChange={(dates) => {
                        const startDate = dates[0].toDateString();
                        const endDate = dates[1].toDateString();
                        const newAlerts = alerts.map((i) => ({ ...i }));
                        const newFilteredAlerts = [];
                        var startPushing = false;

                        newAlerts.forEach((alert) => {
                          if (alert.date === endDate) {
                            startPushing = true;
                          }
                          if (alert.date === startDate) {
                            newFilteredAlerts.push(alert);
                            startPushing = false;
                          }
                          if (startPushing) {
                            newFilteredAlerts.push(alert);
                          }
                        });
                        setFilteredAlerts(newFilteredAlerts);
                      }}
                      selectRange={true}
                    />
                  ) : null}
                </div>
              </div>
              {checked ? (
                filteredAlerts.length > 0 ? (
                  <TemplatePatientTable alerts={filteredAlerts} />
                ) : (
                  <p>No alerts found.</p>
                )
              ) : isCalOpen ? (
                filteredAlerts.length > 0 ? (
                  <TemplatePatientTable alerts={filteredAlerts} />
                ) : (
                  <p>No alerts found.</p>
                )
              ) : (
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
                      <tr key={alert.id}>
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
