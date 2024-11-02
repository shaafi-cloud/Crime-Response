// src/pages/OfficerDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function OfficerDashboard() {
  // Sample data - in a real app, this data would come from the backend based on the logged-in officer
  const assignedIncidents = [
    { id: 1, type: 'Theft', status: 'Pending', priority: 'Medium' },
    { id: 2, type: 'Assault', status: 'Pending', priority: 'Low' },
    { id: 3, type: 'Rape', status: 'Pending', priority: 'High' },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Assigned Incidents</h1>
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">ID</th>
            <th className="border-b p-2 text-left">Type</th>
            <th className="border-b p-2 text-left">Status</th>
            <th className="border-b p-2 text-left">Priority</th>
            <th className="border-b p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedIncidents.map((incident) => (
            <tr key={incident.id}>
              <td className="border-b p-2">{incident.id}</td>
              <td className="border-b p-2">{incident.type}</td>
              <td className="border-b p-2">{incident.status}</td>
              <td className="border-b p-2">{incident.priority}</td>
              <td className="border-b p-2">
                <Link to={`/officer/incidents/${incident.id}`} className="text-blue-500">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OfficerDashboard;
