import React from "react";
import "./AllTabs.css";
import { useState } from "react";
import PainGraph from "../DistressGraphs/PainGraph";
import BowelsGraph from "../DistressGraphs/BowelsGraph";
import BreathingGraph from "../DistressGraphs/BreathingGraph";
import AppetiteGraph from "../DistressGraphs/AppetiteGraph";
import NauseaGraph from "../DistressGraphs/NauseaGraph";
import FatigueGraph from "../DistressGraphs/FatigueGraph";
import SleepingGraph from "../DistressGraphs/SleepingGraph";
import VolumeGraph from "../VolumeGraph/VolumeGraph";

function AllTabs({dataLogs}) {
  const [activeTab, setActiveTab] = useState("tab1");
  function handleTabClick(tab) {
    setActiveTab(tab);
  }
  return (
    <div className="Tabs">
      <ul className="nav">
        <li
          className={activeTab === "tab1" ? "active" : ""}
          onClick={() => handleTabClick("tab1")}
        >
          Volume
        </li>
        <li
          className={activeTab === "tab2" ? "active" : ""}
          onClick={() => handleTabClick("tab2")}
        >
          Pain
        </li>
        <li
          className={activeTab === "tab3" ? "active" : ""}
          onClick={() => handleTabClick("tab3")}
        >
          Bowels
        </li>
        <li
          className={activeTab === "tab4" ? "active" : ""}
          onClick={() => handleTabClick("tab4")}
        >
          Breathing
        </li>
        <li
          className={activeTab === "tab5" ? "active" : ""}
          onClick={() => handleTabClick("tab5")}
        >
          Appetite
        </li>
        <li
          className={activeTab === "tab6" ? "active" : ""}
          onClick={() => handleTabClick("tab6")}
        >
          Nausea
        </li>
        <li
          className={activeTab === "tab7" ? "active" : ""}
          onClick={() => handleTabClick("tab7")}
        >
          Fatigue
        </li>
        <li
          className={activeTab === "tab8" ? "active" : ""}
          onClick={() => handleTabClick("tab8")}
        >
          Sleeping
        </li>
      </ul>
      <div className="outlet">
        {activeTab === "tab1" ? (
          <VolumeGraph dataLogs={dataLogs}/>
        ) : activeTab === "tab2" ? (
          <PainGraph dataLogs = {dataLogs}/>
        ) : activeTab === "tab3" ? (
          <BowelsGraph dataLogs = {dataLogs}/>
        ) : activeTab === "tab4" ? (
          <BreathingGraph dataLogs = {dataLogs}/>
        ) : activeTab === "tab5" ? (
          <AppetiteGraph dataLogs = {dataLogs}/>
        ) : activeTab === "tab6" ? (
          <NauseaGraph dataLogs = {dataLogs}/>
        ) : activeTab === "tab7" ? (
          <FatigueGraph dataLogs = {dataLogs}/>
        ) : activeTab === "tab8" ? (
          <SleepingGraph dataLogs = {dataLogs} />
        ) : null}
      </div>
    </div>
  );
}

export default AllTabs;
