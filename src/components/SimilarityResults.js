import React, { useMemo } from 'react';
import HeatMap from 'react-heatmap-grid';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function SimilarityResults({ results }) {
    // Labels for x-axis and y-axis (Patient IDs)
    const xLabels = useMemo(() => {
        if (!results || !results.similarity_matrix || !results.similarity_matrix[0]) return [];
        return new Array(24).fill(0).map((_, i) => `P-${i + 1}`);
    }, [results]);

    const yLabels = useMemo(() => {
        if (!results || !results.similarity_matrix) return [];
        return new Array(24).fill(0).map((_, i) => `P- ${i + 1}`);
    }, [results]);

    // Data for heatmap
    const data = useMemo(() => {
        if (!results || !results.similarity_matrix) return [];
        return results.similarity_matrix;
    }, [results]);

    // Display similar patients in a table format before heatmap
    const renderSimilarPatientsTable = () => {
        if (!results || !results.similar_patients || results.similar_patients.length === 0) {
            return <p>No similar patients found.</p>;
        }

        return (
            
            <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Tumor Size (cm)</th>
                        <th>Tumor Type</th>
                        <th>Biopsy Result</th>
                        <th>Treatment</th>
                        <th>Response to Treatment</th>
                        <th>Survival Status</th>
                    </tr>
                </thead>
                <tbody>
                    {results.similar_patients.map((patient, index) => (
                      
                        <tr key={index}>
                            <td>{patient.Patient_ID}</td>
                            <td>{patient.Age}</td>
                            <td>{patient.Gender}</td>
                            <td>{patient.Tumor_Size_in_cm}</td>
                            <td>{patient.Tumor_Type}</td>
                            <td>{patient.Biopsy_Result}</td>
                            <td>{patient.Treatment}</td>
                            <td>{patient.Response_to_Treatment}</td>
                            <td>{patient.Survival_Status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // Render heatmap if there is valid data
    if (!results || !data.length) {
        return <p>No data available.</p>;
    }

    return (
        <div>
      <Sidebar />
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  
      <Navbar />
      <div class="container-fluid py-2">
        <div class="row">
        <center>
            {/* Render Similar Patients Table */}
            <h2>Top 5 similar patient </h2>
            {renderSimilarPatientsTable()}

            <div>
              <h2>Similarity Matrix Heatmap</h2>
              <HeatMap
                xLabels={xLabels}
                yLabels={yLabels}
                data={data}
                height={20} // Adjust height of each cell
                width={15} // Adjust width of each cell

              cellRender={(value) => value && `${value.toFixed(1)}`}
              />
              
            </div>
        </center>
            </div>
            </div>
        
          </main>
          {/* <Footer/> */}
          </div>
    );
}

export default SimilarityResults;