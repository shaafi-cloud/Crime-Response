// src/pages/OfficerDashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, AuthProvider } from '../../context/authContex';
import axios from 'axios';

function OfficerDashboard() {
  const  user  = useContext(AuthProvider); // Get user data from context
  console.log("user---------", localStorage.getItem('user_id'))
  const username =localStorage.getItem('user_id'); // Retrieve username from user context

  const [assignedIncidents, setAssignedIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignedIncidents = async () => {
      // if (!username) return; // Ensure username is available before making API call
      
      console.log("Username", username)
      try {
        const response = await axios.get(`http://localhost:5000/api/incident/assign/${username}`);
        setAssignedIncidents(response.data.data);
        console.log("Our data is: ", response.data);
        console.log("Username", username)
      } catch (error) {
        console.error("Failed to fetch assigned incidents:", error);
        setError("Failed to fetch assigned incidents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedIncidents();
  }, []); // Run effect whenever username changes

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div className="text-red-500">{error}</div>;

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
            <tr key={incident._id}>
              <td className="border-b p-2">{incident._id}</td>
              <td className="border-b p-2">{incident.incidentId.typeOfIncident}</td>
              <td className="border-b p-2">{incident.status}</td>
              <td className="border-b p-2">{incident.priority}</td>
              <td className="border-b p-2">
                <Link to={`/officer/incidents/${incident.incidentId._id}`} className="text-blue-500">
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
