import React, { useState } from 'react';
import './AnimatedTabs.css';

const AnimatedTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content-wrapper">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-content ${activeTab === tab.id ? 'active-content' : 'hidden-content'}`}
          >
            {activeTab === tab.id && tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTabs;
