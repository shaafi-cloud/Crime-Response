// src/pages/IncidentDetail.js
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample incident data
  const incident = {
    id,
    type: 'Theft',
    status: 'Pending',
    description: 'Details about the incident go here...',
    location: 'Downtown',
    date: '2024-10-31',
  };

  // State to manage the status
  const [status, setStatus] = useState(incident.status);

  const handleAssignClick = () => {
    navigate(`/assign-incident/${id}`);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    // Here you would typically call the backend to update the status in the database
    console.log(`Status for Incident ${id} updated to: ${e.target.value}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Incident Details</h1>
      <table className="w-full border-collapse mb-6">
        <tbody>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">ID</td>
            <td className="border p-2">{incident.id}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Type</td>
            <td className="border p-2">{incident.type}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Status</td>
            <td className="border p-2">
              <select 
                value={status} 
                onChange={handleStatusChange} 
                className="border p-2 rounded w-full"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Description</td>
            <td className="border p-2">{incident.description}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Location</td>
            <td className="border p-2">{incident.location}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Date</td>
            <td className="border p-2">{incident.date}</td>
          </tr>
        </tbody>
      </table>

      {/* Button to navigate to AssignIncident page */}
      <button 
        onClick={handleAssignClick} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Assign to Officer
      </button>

      <Link to="/incidents" className="inline-block text-blue-500">
        Back to Incidents List
      </Link>
    </div>
  );
}

export default IncidentDetail;
