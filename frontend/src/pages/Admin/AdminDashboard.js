import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div>
      {/* <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md"> */}
        {/* <div className="flex items-center">
          <button className="mr-4 text--50gray0 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div> */}
        <div className="flex items-center">
          {/* <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome to the Admin Dashboard</p>
          </div> */}
          {/* <button className="ml-4 text-gray-500 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          <img src="" alt="Admin Avatar" className="w-10 h-10 rounded-full ml-4" /> */}
        </div>
      {/* </header> */}
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      <div className="p-6 bg-white shadow-md rounded-md">
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
    </div>
  );
}

export default AdminDashboard;