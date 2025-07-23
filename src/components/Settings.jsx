import React, { useEffect, useState } from "react";
import "./Settings.css";

const Settings = ({ toggle, isVisible }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [themeMode, setThemeMode] = useState("light");

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    localStorage.setItem("themeColor", color);
    document.documentElement.style.setProperty("--theme-color", color);
  };

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    localStorage.setItem("themeMode", mode);
    document.documentElement.setAttribute("data-theme", mode);
  };

  useEffect(() => {
    const savedColor = localStorage.getItem("themeColor") || "#1868DB";
    const savedMode = localStorage.getItem("themeMode") || "light";
    setSelectedColor(savedColor);
    setThemeMode(savedMode);
    document.documentElement.style.setProperty("--theme-color", savedColor);
    document.documentElement.setAttribute("data-theme", savedMode);
  }, []);

  return (
    <div className={`settings ${isVisible ? "show-settings" : ""}`}>
      <div className="settings-one-row">
        <span>Settings</span>
        <span className="setting-header-two" onClick={toggle}>
          <i className="fa-solid fa-xmark" style={{ cursor: "pointer" }}></i>
        </span>
      </div>
      <div className="settings-three-row">
        <div className="theme-colors-h">Theme Colors</div>
        <div className="palette">
          <div
            className="color blue"
            onClick={() => handleColorSelect("#3B82F6")}
          ></div>
          <div
            className="color red"
            onClick={() => handleColorSelect("#EF4444")}
          ></div>
          <div
            className="color orange"
            onClick={() => handleColorSelect("#F97316")}
          ></div>
          <div
            className="color green"
            onClick={() => handleColorSelect("#10B981")}
          ></div>
          <div
            className="color purple"
            onClick={() => handleColorSelect("#8B5CF6")}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
