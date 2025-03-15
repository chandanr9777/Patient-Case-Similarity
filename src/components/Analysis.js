import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Analysis = () => {
  // Access graph URLs passed via navigation state
  const location = useLocation();
  const { graphUrls } = location.state || { graphUrls: [] };

  return (
    <div className="app-container">
    <Navbar />
    <div className="main-content">
      <Sidebar />
      <div className="analysis-container">
        <h2>Patient Similarity Analysis</h2>
        {graphUrls.length > 0 ? (
            graphUrls.map((url, index) => (
                <div key={index}>
                    <h3>Graph {index + 1}</h3>
                    <img src={`http://localhost:5000${url}`} alt={`Graph ${index}`} style={{ width: "100%", height: "auto" }} />
                </div>
            ))
        ) : (
            <p>No graphs available. Please upload a file first.</p>
        )}
    </div>
    </div>
  </div>
  );
};

export default Analysis;
