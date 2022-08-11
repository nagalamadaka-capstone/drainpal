import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Articles.css";

function PalliativeCare({ handleSignInOpen, handleCreateAccOpen, isLoggedIn }) {
  return (
    <div className="palliativeCare">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        handleCreateAccOpen={handleCreateAccOpen}
        isLoggedIn={isLoggedIn}
      />
      <div className="notNavbar">
        <div className="wrapper">
          <h1>What is Palliative Care, and how can it help me?</h1>
          <p>
            The WHO defines <span className="bold">Palliative Care</span> as “an
            approach that improves the
            <span className="bold"> quality of life</span> of patients and their
            families… through the 
            <span className="bold"> prevention and relief of suffering</span> by
            means of early identification and impeccable assessment and
            treatment of pain and other problems, physical, psychosocial, and
            spiritual.”
          </p>
          <h3>What is the difference between Palliative Care and Hospice?</h3>
          <p>
            Simply put, Palliative Care is comfort care{" "}
            <span className="bold">with or without curative intent</span>, while
            Hospice is comfort care without curative intent.
          </p>
          <img
            src="https://www.researchgate.net/profile/Sharron-Docherty/publication/236615176/figure/fig2/AS:667711667441664@1536206275045/Concurrent-integrative-model-of-palliative-care-A-National-Framework-and-Preferred.png"
            alt="describing palliative care"
          />
        </div>
      </div>
    </div>
  );
}

export default PalliativeCare;
