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
    const allTabs = ["Volume", "Pain", "Bowels", "Breathing", "Appetite", "Nausea", "Fatigue", "Sleeping"];
  const [activeTab, setActiveTab] = useState("tab1");
  function handleTabClick(tab) {
    setActiveTab(tab);
  }
  return (
    <div className="Tabs">
      <ul className="nav">
        {allTabs.map((tab) => (
            <li key={tab}
                className={tab === activeTab ? "active" : ""}
                onClick={() => handleTabClick(tab)}
            >
                {tab}
            </li>
        ))}



      </ul>
      <div className="outlet">
        {activeTab === allTabs[0] ? (
          <VolumeGraph dataLogs={dataLogs}/>
        ) : activeTab === allTabs[1] ? (
          <PainGraph dataLogs = {dataLogs}/>
        ) : activeTab === allTabs[2] ? (
          <BowelsGraph dataLogs = {dataLogs}/>
        ) : activeTab === allTabs[3] ? (
          <BreathingGraph dataLogs = {dataLogs}/>
        ) : activeTab === allTabs[4] ? (
          <AppetiteGraph dataLogs = {dataLogs}/>
        ) : activeTab === allTabs[5] ? (
          <NauseaGraph dataLogs = {dataLogs}/>
        ) : activeTab === allTabs[6] ? (
          <FatigueGraph dataLogs = {dataLogs}/>
        ) : activeTab === allTabs[7] ? (
          <SleepingGraph dataLogs = {dataLogs} />
        ) : null}
      </div>
    </div>
  );
}

export default AllTabs;
