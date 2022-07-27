import React from "react";
import "./AllTabs.css";
import { useState } from "react";

import VolumeGraph from "../VolumeGraph/VolumeGraph";
import TemplateGraph from "../DistressGraphs/TemplateGraph";
import ColorGraph from "../ColorGraph/ColorGraph";

function AllTabs({ dataLogs }) {
  const allTabs = [
    "volume",
    "color",
    "pain",
    "bowels",
    "breathing",
    "appetite",
    "nausea",
    "fatigue",
    "sleeping",
  ];
  const [activeTab, setActiveTab] = useState("tab1");
  function handleTabClick(tab) {
    setActiveTab(tab);
  }
  return (
    <div className="Tabs">
      <ul className="nav">
        {allTabs.map((tab) => (
          <li
            key={tab}
            className={tab === activeTab ? "active" : ""}
            onClick={() => handleTabClick(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </li>
        ))}
      </ul>
      <div className="outlet">
        {activeTab === allTabs[0] ? (
          <VolumeGraph dataLogs={dataLogs} />
        ) : activeTab === allTabs[1] ? (
          <ColorGraph dataLogs={dataLogs} />
        ) : (
          <TemplateGraph dataLogs={dataLogs} type={activeTab} />
        )}
      </div>
    </div>
  );
}

export default AllTabs;
