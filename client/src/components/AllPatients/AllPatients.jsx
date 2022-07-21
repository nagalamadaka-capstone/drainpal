import React from "react";
import NavBar from "../NavBar/NavBar";
import "./AllPatients.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = "http://localhost:3001";

function AllPatients({
  isLoggedIn,
  handleSignInOpen,
  handleCreateAccOpen,
  lastName,
  isDoctorLoggedIn,
}) {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/users/getPatients`, {
        params: { lastName },
      })
      .then((res) => {
        setPatients(res.data);
      });
    setIsLoading(false);
  }, []);

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
          <h1>Your Patients</h1>
          {isLoading ? (
            <div className="loading">
              <h1>Loading...</h1>
            </div>
          ) : (
            <table className="patient-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Drain Type</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr>
                    <td>
                      <Link to={`/viewpatient`}>
                        {patient.firstname} {patient.lastname}
                      </Link>
                    </td>
                    <td>{patient.email}</td>
                    <td>{patient.draintype}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllPatients;
