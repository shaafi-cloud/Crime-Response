// src/pages/Overview.js
import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-md">
          <h2>Total Incidents</h2>
          <p className="text-xl">42</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-md">
          <h2>Types</h2>
          <p className="text-xl">5 Types</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-md">
          <h2>Statuses</h2>
          <p className="text-xl">3 Statuses</p>
        </div>
      </div>
      {/* <Link to="/incidents" className="mt-6 inline-block text-blue-500">
        View Incident List
      </Link> */}
    </div>
  );
}

export default AdminDashboard;
