import React from "react";
import "./AllTabs.css";
import { useState } from "react";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";

function AllTabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  function handleTabClick(tab) {
    setActiveTab(tab);
  }
  return (
    <div className="Tabs">
      <ul className="nav">
        <li className={activeTab === "tab1" ? "active" : ""} onClick={() => handleTabClick("tab1")}>Tab 1</li>
        <li className={activeTab === "tab2" ? "active" : ""} onClick = {() => handleTabClick("tab2")}>Tab 2</li>
        <li className={activeTab === "tab3" ? "active" : ""} onClick = {() => handleTabClick("tab3")}>Tab 3</li>
        <li className={activeTab === "tab4" ? "active" : ""} onClick = {() => handleTabClick("tab4")}>Tab 4</li>
        <li className={activeTab === "tab5" ? "active" : ""} onClick = {() => handleTabClick("tab5")}>Tab 5</li>
        <li className={activeTab === "tab6" ? "active" : ""} onClick = {() => handleTabClick("tab6")}>Tab 6</li>
        <li className={activeTab === "tab7" ? "active" : ""} onClick = {() => handleTabClick("tab7")}>Tab 7</li>
        <li className={activeTab === "tab8" ? "active" : ""} onClick = {() => handleTabClick("tab8")}>Tab 8</li>
      </ul>
      <div className="outlet">
        {activeTab === "tab1" ? <FirstTab /> : activeTab === "tab2"? <SecondTab/> : null}
      </div>
    </div>
  );
}

export default AllTabs;
