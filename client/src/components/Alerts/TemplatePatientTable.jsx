import React from "react";
import "../AllPatients/AllPatients.css";
import "./Alerts.css";
import { Link } from "react-router-dom";

function TemplatePatientTable({ alerts }) {
  function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <div className="allPatients">
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
    </div>
  );
}

export default TemplatePatientTable;
