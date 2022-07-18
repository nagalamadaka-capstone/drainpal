import React from "react";
import "./CreateAcc.css";

function CreateAcc({
  createAcc,
  handleOnCreateAccFormChange,
  handleCreateAccOpen,
  handleOnCreateAccSubmit,
  createaccerror,
}) {
  return (
    <div className="createAcc">
      <form className="createAcc-form">
        <button className="back-button" onClick={() => handleCreateAccOpen()}>
          {" "}
          &rarr;
        </button>
        <h1>Create A New Account!</h1>
        <h2>or Sign in with Facebook.</h2>
        {createaccerror ? <p className="error">{createaccerror}</p> : null}

        <h2>First Name</h2>
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
        <input
          type="text"
          name="healthcareprovider"
          placeholder="e.g. John Doe"
          className="create-acc-input"
          value={createAcc.healthcareprovider}
          onChange={(e) => {
            handleOnCreateAccFormChange("healthcareprovider", e.target.value);
          }}
        />

        <button
          className="create-acc-button"
          type="button"
          onClick={() => handleOnCreateAccSubmit(createAcc)}
        >
          {" "}
          Create Account{" "}
        </button>
      </form>
    </div>
  );
}

export default CreateAcc;
