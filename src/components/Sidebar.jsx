import React, { useState } from "react";
import "./Sidebar.css";
import Settings from "./Settings";

const SideBar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const handleShowSettings = () => {
    setShowSettings((prev) => !prev);
    // setRotate((prev) => !prev);
  };

  const [rotate, setRotate] = useState(true);
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <span className="sidebar-top-span" title="logo">
          <img src="./vite.svg" alt="" />
        </span>
      </div>
      <div className="sidebar-bottom">
        <span
          className="sidebar-top-span"
          style={{ color: "white" }}
          title="help!"
        >
          <i class="fa-solid fa-circle-question"></i>
        </span>
        <span
          className="sidebar-top-span"
          style={{ color: "white", cursor: "pointer" }}
          onClick={() => setShowSettings((prev) => !prev)}
        >
          <i className={`fa-solid fa-gear ${rotate ? "rotate" : ""}`}></i>
        </span>
        <Settings toggle={handleShowSettings} isVisible={showSettings} />
      </div>
    </div>
  );
};
export default SideBar;
