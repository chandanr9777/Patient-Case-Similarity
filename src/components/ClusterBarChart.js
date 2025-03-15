import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function ClusterBarChart({ results }) {
  // Count occurrences of each cluster (0-4)
  const clusterCounts = [0, 1, 2, 3, 4].map(cluster => ({
    cluster: `Cluster ${cluster}`,
    count: results.clusters.filter(c => c === cluster).length,
  }));

  return (
    <div>
    <Sidebar />
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

    <Navbar />
    <div class="container-fluid py-2">
      <div class="row">
      <h2>Cluster Distribution</h2>
      <BarChart width={600} height={300} data={clusterCounts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="cluster" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
    </div>

  </main>
  {/* <Footer/> */}
  </div>
  );
}

export default ClusterBarChart;