import React from "react";
import NavBar from "../NavBar/NavBar";
import "./DataHome.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function DataHome({
  handleSignInOpen,
  handleCreateAccOpen,
  isLoggedIn,
  userId,
}) {
  const [dataLogs, setDataLogs] = useState([]);
  const [dataLogsError, setDataLogsError] = useState(null);
  const [dataLogsLoading, setDataLogsLoading] = useState(false);
  const API_BASE_URL = "http://localhost:3001";

  const fetchDataLogs = async () => {
    setDataLogsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/datalogs/`, {
        params: { userId: userId },
      });
      const newDataLogs = response.data.newDataLogs;
      const reversedDataLogs = [...newDataLogs].reverse();
      setDataLogs(reversedDataLogs);
      setDataLogsError("");
    } catch (error) {
      setDataLogsError(error);
    }
    setDataLogsLoading(false);
  };

  useEffect(() => {
    fetchDataLogs();
  }, []);

  if (!dataLogs) {
    setDataLogsError("No data logs found. Please enter one today above.");
  }

  return (
    <div className="dataHome">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
      />
      <div className="notNavBar">
        <div className="wrapper">
          <h1>Data</h1>
          <h2>Past Logs</h2>
          <Link to="/datalog">
            <button className="add-new-datalog">Add new data log</button>
          </Link>
          {dataLogsError && <p>{dataLogsError}</p>}
          {dataLogsLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {dataLogs.map((dataLog) => (
                <div className="timeline">
                  <div className="timeline-component">
                    <div className="timeline-date">{dataLog.date}</div>
                  </div>
                  <div className="timeline-middle">
                    <div className="timeline-point"></div>
                  </div>
                  <div className="timeline-component timeline-data-entry">
                    <h2>Drain Output: {dataLog.drainoutput}mL</h2>
                    <h2>Drain Color: {dataLog.draincolor}</h2>
                    <p>distress from pain: {dataLog.pain}</p>
                    <p>distress from nausea: {dataLog.nausea}</p>
                    <p>distress from appetite: {dataLog.appetite}</p>
                    <p>distress from breathing: {dataLog.breathing}</p>
                    <p>distress from fatigue: {dataLog.fatigue}</p>
                    <p>distress from sleeping: {dataLog.sleeping}</p>
                    <p>distress from bowels: {dataLog.bowels}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataHome;
