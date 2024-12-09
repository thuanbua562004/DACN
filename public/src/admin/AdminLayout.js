import React from 'react';
import { Outlet } from 'react-router-dom';
import './templatemo-style.css'; // Import styles globally
import Navbar from './Navbar';

const AdminLayout = () => {
  return (
    <div id='admin' style={{ marginTop: '0px' }}>
      <Navbar/>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
