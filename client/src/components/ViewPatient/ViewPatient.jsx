import React from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./ViewPatient.css";
import VolumeGraph from "../VolumeGraph/VolumeGraph";
import DistressGraphs from "../DistressGraphs/DistressGraphs";
import AllTabs from "../AllTabs/AllTabs";

function ViewPatient({
  isDoctorLoggedIn,
  isLoggedIn,
  handleSignInOpen,
  handleCreateAccOpen,
}) {
  const [dataLogs, setDataLogs] = useState([]);
  const [dataLogsError, setDataLogsError] = useState(null);
  const [dataLogsLoading, setDataLogsLoading] = useState(false);
  const [draintype, setDraintype] = useState("");
  const API_BASE_URL = "http://localhost:3001";

  const params = useParams();
  let userId = params.userId;
  let firstname = params.firstname;
  let lastname = params.lastname;

  let key = "draintype";

  const fetchDrainType = async () => {
    setDataLogsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/users/getprofileinfo`, {
        params: { key, id: userId },
      });
      const draintype = response.data.key;

      setDraintype(draintype);
    } catch (error) {
      setDataLogsError(error);
    }
    setDataLogsLoading(false);
  };

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
    fetchDrainType();
  }, []);

  return (
    <div className="viewPatient">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        isDoctorLoggedIn={isDoctorLoggedIn}
      />
      <div className="notNavBar">
        <div className="wrapper">
          <h1>Drain Data</h1>
          <h2>
            {firstname} {lastname}
          </h2>
          {dataLogsError && <p>{dataLogsError}</p>}
          {dataLogsLoading && <p>Loading...</p>}
          {dataLogs.length === 0 && (
            <p>
              No data logs found. Please tell your patient to track their
              symptoms.
            </p>
          )}

          {dataLogs.length > 0 && (
            <div className="dataLogs">
              <table className="symptom-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Volume</th>
                    <th>Color</th>
                    <th>Patient Symptoms</th>
                    <th>Patient Concerns</th>
                  </tr>
                </thead>
                <tbody>
                  {dataLogs.map((dataLog) => (
                    <tr key={dataLog.id}>
                      <td>{dataLog.date}</td>
                      <td>{dataLog.time}</td>
                      <td>{draintype}</td>
                      <td>{dataLog.drainOutput}</td>
                      <td>
                        <div
                          className="exampleColorVP"
                          style={{ backgroundColor: `${dataLog.drainColor}` }}
                        ></div>
                      </td>
                      <td>{dataLog.symptoms}</td>
                      <td>{dataLog.concerns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <AllTabs dataLogs={dataLogs} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewPatient;
