import React from 'react';
import NavBar from '../NavBar/NavBar';
import "./AllPatients.css";
import { Link } from 'react-router-dom';

function AllPatients({isLoggedIn,
    handleSignInOpen,
    handleCreateAccOpen,
    isDoctorLoggedIn}) {
  return (
    <div className='allPatients'>
        <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        isDoctorLoggedIn = {isDoctorLoggedIn}
      />
      <div className="notNavBar">
        <div className="wrapper">
            <h1>Your Patients</h1>
            <table className='patient-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Drain Type</th>
                        <th>Healthcare Provider</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        <Link to = "/viewpatient">
                        John Doe
                        </Link>
                        </td>
                        <td>
                            sample email
                        </td>
                        <td>Drain</td>
                        <td>Provider</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default AllPatients
