import React, { useEffect, useState } from 'react';
import './Settings.css';

const Settings = ({ toggle, isVisible }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [themeMode, setThemeMode] = useState('light');

  // Apply theme color
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    localStorage.setItem('themeColor', color);
    document.documentElement.style.setProperty('--theme-color', color);
  };

  // Apply theme mode
  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('themeMode', mode);
    document.documentElement.setAttribute('data-theme', mode);
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem('themeColor') || '#1868DB';
    const savedMode = localStorage.getItem('themeMode') || 'light';
    setSelectedColor(savedColor);
    setThemeMode(savedMode);
    document.documentElement.style.setProperty('--theme-color', savedColor);
    document.documentElement.setAttribute('data-theme', savedMode);
  }, []);

  return (
    isVisible && (
      <div className="settings">
        <div className="settings-one-row">
          <span>Settings</span>
          <span className="setting-header-two" onClick={toggle}>
            <i className="fa-solid fa-xmark" style={{ cursor: 'pointer' }}></i>
          </span>
        </div>

        <div className="settings-two-row">
          <p style={{ marginBottom: '13px' }}>Theme Option</p>
          <div className="theme-radio-select">
            <div className="radio-select">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={themeMode === 'light'}
                onChange={() => handleThemeChange('light')}
              />
              <span>Light</span>
            </div>
            <div className="radio-select">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={themeMode === 'dark'}
                onChange={() => handleThemeChange('dark')}
              />
              <span>Dark</span>
            </div>
          </div>
        </div>

        <div className="settings-three-row">
          <div className="theme-colors-h">Theme Colors</div>
          <div className="palette">
            <div className="color blue" onClick={() => handleColorSelect('#1868DB')}></div>
            <div className="color red" onClick={() => handleColorSelect('black')}></div>
            <div className="color orange" onClick={() => handleColorSelect('orange')}></div>
            <div className="color pink" onClick={() => handleColorSelect('rgba(118, 203, 118, 1)')}></div>
            <div className="color purple" onClick={() => handleColorSelect('purple')}></div>
          </div>
        </div>
      </div>
    )
  );
};

export default Settings;
