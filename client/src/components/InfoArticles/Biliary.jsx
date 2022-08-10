import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Articles.css";

function Biliary({ handleSignInOpen, handleCreateAccOpen, isLoggedIn }) {
  return (
    <div className="palliativeCare">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        handleCreateAccOpen={handleCreateAccOpen}
        isLoggedIn={isLoggedIn}
      />
      <div className="notNavbar">
        <div className="wrapper">
          <h1>
            EXTERNAL BILIARY DRAINAGE CATHETER: General Drain Information and
            Care Instructions
          </h1>
          <p>
            A biliary drain is a thin, flexible tube that goes through the skin
            into the the ducts in the liver through which bile flows. The tube
            is used to drain bile and prevent it from building up in the liver.
          </p>
          <h3>Caring for the tube</h3>
          <ul>
            <li>
              Inspect the external tube often for kinks, especially if the
              dressing is wet and leaking urine.
            </li>
            <li>
              Empty the drainage bag at around the same times each day, or when
              it is about 2/3 full.
            </li>
            <li>
              Keep the drainage bag below the level of the insertion site so it
              will drain easily.
            </li>
            <li>
              Do not clamp or cap your tube unless specifically instructed to do
              so by the provider or team that placed the tube.
            </li>
          </ul>
          <p>
            Dressing should be changed at least once every 2 days, and after
            every shower. Because it is usually located on your back, help from
            another person may be needed.{" "}
          </p>
          <ul>
            <li> Wash hands thoroughly with soap and water after every use.</li>
            <li>Take off old dressing and discard </li>
            <li>
              Inspect the site for redness, swelling, tenderness, or foul/bloody
              drainage{" "}
            </li>
            <li>
              Clean around the insertion site, where the tube enters the skin,
              with soap and water. This may be done in the shower. Dry gently
              and thoroughly.
            </li>
            <li>Cover the site with gauze and tape to the skin.</li>
          </ul>
          <h3> Bathing </h3>
          <p>You may shower 24 hours after your drain has been placed. </p>
          <h4>Showering during the first 14 days after tube placement</h4>
          <ul>
            <li>
              Before taking a shower, cover the dressing with a double layer of
              plastic (Saran) wrap and tape edges to skin
            </li>
            <li>After the shower, remove plastic wrap and change dressing </li>
          </ul>
          <h4>Showering after the first 14 days or when site is healed</h4>
          <ul>
            <li>
              You may shower without dressing or plastic wrap with soap and
              water.
            </li>
            <li>Rinse well</li>
            <li>Pat the area dry and apply a clean, dry dressing</li>
          </ul>
          <p>
            Do not soak in the bath tub, use a spa, go swimming, or allow the
            puncture site to be under water for the duration for which you have
            the tube placed, as this may lead to the development of infections
          </p>
          <h3>Irrigation/Flushing</h3>
          <ul>
            <li>
              Nephrostomy tubes are typically not routinely flushed -- it is not
              necessary unless you are specifically instructed to do so.{" "}
            </li>
            <li>
              Even if you are instructed to flush your tube, you may be provided
              with a few pre-filled syringes for flushing. Keep these on hand in
              the event you are instructed to flush your tube.{" "}
            </li>
          </ul>
          <h3> Activity </h3>
          <ul>
            <li> You may resume activities as tolerated.</li>
            <li>
              Avoid activities that cause a pulling sensation or pain around the
              tube, or kinking of the tube.{" "}
            </li>
            <li>
              Avoid activities such as bending forward or lifting heavy objects,
              as this may result in leaking around the tube{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Biliary;
