import React from "react";
import "./CreateAcc.css";

function CreateAcc({
  createAcc,
  handleOnCreateAccFormChange,
  handleCreateAccOpen,
  handleOnCreateAccSubmit,
  createaccerror,
  createaccsuccess,
  doctorsList,
}) {
  return (
    <div className="createAcc">
      <form className="createAcc-form">
        <button className="back-button" onClick={() => handleCreateAccOpen()}>
          {" "}
          &rarr;
        </button>
        <h1>Create A New Account!</h1>
        <h3>or Sign in with Facebook.</h3>
        {createaccerror ? <p className="error">{createaccerror}</p> : null}
        {createaccsuccess ? (
          <p className="createaccsuccess">{createaccsuccess}</p>
        ) : null}

        <div className="create-acc-input-div">
          <h2 className="noMarginTop">First Name</h2>
          <input
            type="text"
            name="firstname"
            placeholder="e.g. John"
            className="create-acc-input"
            value={createAcc.firstname}
            onChange={(e) => {
              handleOnCreateAccFormChange("firstname", e.target.value);
            }}
          />

          <h2>Last Name</h2>
          <input
            type="text"
            name="lastname"
            placeholder="e.g. Smith"
            className="create-acc-input"
            value={createAcc.lastname}
            onChange={(e) => {
              handleOnCreateAccFormChange("lastname", e.target.value);
            }}
          />

          <h2>E-mail</h2>
          <input
            type="email"
            name="email"
            placeholder="e.g. drainpal@drainpal.com"
            className="create-acc-input"
            value={createAcc.email}
            onChange={(e) => {
              handleOnCreateAccFormChange("email", e.target.value);
            }}
          />

          <h2>Password</h2>
          <input
            type="password"
            name="password"
            placeholder="********"
            className="create-acc-input"
            value={createAcc.password}
            onChange={(e) => {
              handleOnCreateAccFormChange("password", e.target.value);
            }}
          />

          <h2>Drain Type</h2>
          <select
            name="draintype"
            className="create-acc-input"
            value={createAcc.draintype}
            onChange={(e) => {
              handleOnCreateAccFormChange("draintype", e.target.value);
            }}
          >
            <option value="">Select a Drain Type</option>
            <option value="PCN">Percutaneous Nephrostomy Tube</option>
          </select>

          <h2>Drain Site</h2>
          <select
            name="drainsite"
            className="create-acc-input"
            value={createAcc.drainsite}
            onChange={(e) => {
              handleOnCreateAccFormChange("drainsite", e.target.value);
            }}
          >
            <option value="">Select a Drain Site</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
            <option value="Both">Both</option>
          </select>

          <h2>Health Care Provider</h2>
          <select
            name="healthcareprovider"
            className="create-acc-input"
            value={createAcc.healthcareprovider}
            onChange={(e) => {
              handleOnCreateAccFormChange("healthcareprovider", e.target.value);
            }}
          >
            <option value="">Select a Healthcare Provider</option>
            {doctorsList.map((doctor) => (
              <option key={doctor.id} value={doctor.lastname}>
                Dr. {doctor.firstname} {doctor.lastname}
              </option>
            ))}
          </select>

          <button
            className="create-acc-button"
            type="button"
            onClick={() => handleOnCreateAccSubmit(createAcc)}
          >
            {" "}
            Create Account{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAcc;
