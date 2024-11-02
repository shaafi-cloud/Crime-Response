// src/pages/Officer/OfficerIncidentDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

function OfficerIncidentDetail() {
  const { id } = useParams();

    const officerIncidents = [
      { id: 1, type: 'Theft', status: 'Pending', priority: 'Medium' },
      { id: 2, type: 'Assault', status: 'Pending', priority: 'Low' },
      { id: 3, type: 'Rape', status: 'Pending', priority: 'High' },
  ];
  const incident = officerIncidents.find((item) => item.id === parseInt(id));

  if (!incident) {
    return <p>Incident not found</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Incident Details</h1>
      <table className="min-w-full bg-white mb-4">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-semibold">ID</td>
            <td className="border px-4 py-2">{incident.id}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Type</td>
            <td className="border px-4 py-2">{incident.type}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Status</td>
            <td className="border px-4 py-2">
              <select className="border rounded p-1">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Priority</td>
            <td className="border px-4 py-2">{incident.priority}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Description</td>
            <td className="border px-4 py-2">Details about the theft incident...</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Location</td>
            <td className="border px-4 py-2">{incident.location}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Date</td>
            <td className="border px-4 py-2">2024-10-31</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Admin Notes</td>
            <td className="border px-4 py-2">Check for CCTV footage.</td>
          </tr>
        </tbody>
      </table>

      <div>
        <label className="font-semibold block mb-2">Officer's Notes</label>
        <textarea
          className="border p-2 w-full rounded"
          placeholder="Add your notes here..."
          rows="4"
        ></textarea>
      </div>

      <div className="flex items-center justify-between mt-6">
        {/* Back to Dashboard with Arrow Icon */}
        <Link to="/officer" className="text-blue-500 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Update Status & Notes Button on the Left */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl">
          Submit
        </button>
      </div>
    </div>
  );
}

export default OfficerIncidentDetail;
