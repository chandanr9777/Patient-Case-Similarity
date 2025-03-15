import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Navbar from './Navbar';
import Sidebar from './Sidebar';


function Upload({ setResults = () => {} }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`http://localhost:5000/uploaddata`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      console.log("Response data:", response.data);
      
      if (response.data.error) {
        alert(`Error from server: ${response.data.error}`);
        return;
      }
      
      setResults(response.data);
      navigate('/clusterresults');
      
    } catch (error) {
      console.error("Error during file upload:", error.response || error.message);
      alert("An error occurred while uploading the file. Please check console for details.");
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
                <h6 class="text-white text-capitalize ps-3">Upload Dataset</h6>
                <p class="mb-0 text-white ps-3">Upload thr csv here</p>
              </div>
            </div>
            <div class="card-body">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            </div>
          </div>
        </div>
      </div>

    
            
        
          </main>
          {/* <Footer/> */}
          </div>
  );
}

export default Upload;