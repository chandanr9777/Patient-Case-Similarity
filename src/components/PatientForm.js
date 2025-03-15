import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function PatientForm({ setResults }) {
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState({
        age: '',
        gender: '',
        tumorSize: '',
        tumorType: '',
        biopsyResult: '',
        treatment: '',
        responseToTreatment: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all required fields are filled
        if (!patientData.age || !patientData.gender || !patientData.tumorSize || !patientData.tumorType || !patientData.biopsyResult || !patientData.treatment || !patientData.responseToTreatment) {
            alert('Please fill in all fields');
            return;
        }

        try {
          const response = await axios.post('http://localhost:5000/analyze_patient', 
              { patient_data: patientData },  // Pass data directly here
              { headers: { 'Content-Type': 'application/json' } }
          );
          console.log("Response data:", response.data);
          if (response.status === 200) {
              console.log(response.data)
              setResults(response.data);
              navigate('/similarityresults');
          } else {
              alert(`Error: ${response.data.error || "Unknown error"}`);
          }
      } catch (error) {
          console.error('Error sending request:', error);
          alert('An error occurred. Please try again later.');
      }
          
    };

    return (
      <div>
      <Sidebar />
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  
      <Navbar />
      <div class="row min-vh-80">
        <div class="col-6 mx-auto">
          <div class="card mt-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">

                <center><h4 class="text-white text-capitalize ps-3">Enter New Patient Data</h4></center>
            
              </div>
            </div>
            <div class="card-body">
            <form onSubmit={handleSubmit}>

        
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={patientData.age}
            onChange={handleInputChange}
            required
          />
        </div>
  
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={patientData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
  
        <div>
          <label htmlFor="tumorSize">Tumor Size (cm):</label>
          <input
            type="number"
            id="tumorSize"
            name="tumorSize"
            value={patientData.tumorSize}
            onChange={handleInputChange}
            step="0.01"
            required
          />
        </div>
  
        <div>
          <label htmlFor="tumorType">Tumor Type:</label>
          <select
            id="tumorType"
            name="tumorType"
            value={patientData.tumorType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Tumor Type</option>
            <option value="Benign">Benign</option>
            <option value="Malignant">Malignant</option>
          </select>
        </div>
  
        <div>
          <label htmlFor="biopsyResult">Biopsy Result:</label>
          <select
            id="biopsyResult"
            name="biopsyResult"
            value={patientData.biopsyResult}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Biopsy Result</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
          </select>
        </div>
  
        <div>
          <label htmlFor="treatment">Treatment:</label>
          <select
            id="treatment"
            name="treatment"
            value={patientData.treatment}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Treatment</option>
            <option value="Surgery">Surgery</option>
            <option value="Chemotherapy">Chemotherapy</option>
            <option value="Radiation Therapy">Radiation Therapy</option>
          </select>
        </div>
  
        <div>
          <label htmlFor="responseToTreatment">Response to Treatment:</label>
          <select
            id="responseToTreatment"
            name="responseToTreatment"
            value={patientData.responseToTreatment}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Response</option>
            <option value="Complete Response">Complete Response</option>
            <option value="Partial Response">Partial Response</option>
            <option value="No Response">No Response</option>
          </select>
        </div>
  
        <button type="submit">Analyze Patient Data</button>
      </form>
            </div>
          </div>
        </div>
      </div>


  </main>
  {/* <Footer/> */}
  </div>
    );
}

export default PatientForm;