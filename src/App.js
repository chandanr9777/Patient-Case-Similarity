import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Index from './components/Index';
import Upload from './components/Upload';
import Analysis from './components/Analysis';
import PatientForm from './components/PatientForm';
import SimilarityResults from './components/SimilarityResults';
import Sidebar from './components/Sidebar';
import ClusterBarChart from './components/ClusterBarChart';

function App() {
  // State to check if user is authenticated (can be replaced with actual authentication logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
   // State to hold the results of the file upload
   const [results, setResults] = useState(null);
   const [patientresults, setPatientResults] = useState(null);

  // Handle login success by setting authentication state and storing userRole
  const handleLogin = (token, role) => {
      sessionStorage.setItem('userRole', role); // Store userRole in sessionStorage
    
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('userRole'); // Optionally clear session storage on logout
  };
  return (
    <Router>
      
      <Routes>
        {/* Public routes */}

        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
        />

        {/* Private routes (only accessible if authenticated) */}
        {isAuthenticated && (
          <>
            <Route path="/" element={<Index />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/upload" element={ <Upload setResults={setResults} />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/patientform" element={<PatientForm setResults={setResults} />} />
            <Route path="/similarityresults" element={<SimilarityResults results={results} />} />
            <Route path="/clusterresults" element={<ClusterBarChart results={results} />} />

            
           
          </>
        )}

        {/* Redirect to login if not authenticated */}
        {!isAuthenticated && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
