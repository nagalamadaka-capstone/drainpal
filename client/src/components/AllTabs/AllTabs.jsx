import React from "react";
import "./AllTabs.css";
import { useState } from "react";

import VolumeGraph from "../VolumeGraph/VolumeGraph";
import TemplateGraph from "../DistressGraphs/TemplateGraph";

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
          <TemplateGraph dataLogs = {dataLogs} type = {"pain"}/>
        ) : activeTab === allTabs[2] ? (
            <TemplateGraph dataLogs = {dataLogs} type = {"bowels"}/>
        ) : activeTab === allTabs[3] ? (
            <TemplateGraph dataLogs = {dataLogs} type = {"breathing"}/>
        ) : activeTab === allTabs[4] ? (
            <TemplateGraph dataLogs = {dataLogs} type = {"appetite"}/>
        ) : activeTab === allTabs[5] ? (
            <TemplateGraph dataLogs = {dataLogs} type = {"nausea"}/>
        ) : activeTab === allTabs[6] ? (
            <TemplateGraph dataLogs = {dataLogs} type = {"fatigue"}/>
        ) : activeTab === allTabs[7] ? (
            <TemplateGraph dataLogs = {dataLogs} type = {"sleeping"}/>
        ) : null}
      </div>
    </div>
  );
}

export default AllTabs;
