import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
// import Footer from './footer'

const Index = () => (
  <div>
    <Sidebar />
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

    <Navbar />
    <div class="container-fluid py-2">
      <div class="row">
          <h1>Welcome to the EHR System</h1>
          {/* Add more content here */}
      </div>
    </div>
  </main>
  {/* <Footer/> */}
  </div>
);

export default Index;
