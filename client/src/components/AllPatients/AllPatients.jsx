import React from "react";
import NavBar from "../NavBar/NavBar";
import "./AllPatients.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const API_BASE_URL = "http://localhost:3001";

function AllPatients({
  isLoggedIn,
  handleSignInOpen,
  handleCreateAccOpen,
  lastName,
  isDoctorLoggedIn,
}) {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
    setTimeout(() => setIsLoading(false), 6000);
  }, []);

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/users/getPatients`, {
        params: { lastName },
      });
      const patients = response.data;
      setPatients(patients);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

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
          <h1>All Patients</h1>
          {isLoading ? (
            <LoadingSpinner />
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
                  <tr key={patient.id}>
                    <td>
                      <Link
                        to={`/viewpatient/${patient.id}/${capitalizeName(
                          patient.firstname
                        )}/${capitalizeName(patient.lastname)}`}
                      >
                        {" "}
                        {capitalizeName(patient.firstname) +
                          " " +
                          capitalizeName(patient.lastname)}
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
