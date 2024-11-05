import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState(null);
  const [incidentData, setIncidentData] = useState([]);
  const [incidentTypes, setIncidentTypes] = useState([]);
  const [incidentStatuses, setIncidentStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incident/all');
        setIncidentData(response.data.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    const fetchIncidentTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incident/types');
        setIncidentTypes(response.data.data);
      } catch (error) {
        console.error("Error fetching incident types:", error);
      }
    };

    const fetchIncidentStatuses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incident/statuses');
        setIncidentStatuses(response.data.data);
      } catch (error) {
        console.error("Error fetching incident statuses:", error);
      }
    };

    fetchIncidents();
    fetchIncidentTypes();
    fetchIncidentStatuses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Dashboard Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div
          className="text-purple-700 p-6 rounded-lg shadow-md cursor-pointer"
          onClick={() => handleSectionClick('incidents')}
        >
          <h2 className="text-lg font-semibold">Total Incidents</h2>
          <p className="text-3xl font-bold mt-2">{incidentData.length}</p>
        </div>

        <div
          className="text-gray-600 p-6 rounded-lg shadow-md cursor-pointer"
          onClick={() => handleSectionClick('types')}
        >
          <h2 className="text-lg font-semibold">Available Types</h2>
          <p className="text-3xl font-bold mt-2">{incidentTypes.length}</p>
        </div>

        <div
          className="text-purple-700 p-6 rounded-lg shadow-md cursor-pointer"
          onClick={() => handleSectionClick('statuses')}
        >
          <h2 className="text-lg font-semibold">Incident Status</h2>
          <p className="text-3xl font-bold mt-2">{incidentStatuses.length}</p>
        </div>
      </div>

      {/* Incident Tables */}
      {activeSection === 'incidents' && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Incidents</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {incidentData.map(incident => (
                <tr key={incident._id}>
                  <td className="border px-4 py-2">{incident._id}</td>
                  <td className="border px-4 py-2">{incident.status}</td>
                  <td className="border px-4 py-2">{incident.typeOfIncident}</td>
                  <td className="border px-4 py-2">{incident.location}</td>
                  <td className="border px-4 py-2">{new Date(incident.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSection === 'types' && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Available Types</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Count</th>
                <th className="border px-4 py-2">Incidents</th>
              </tr>
            </thead>
            <tbody>
              {incidentTypes.map(type => (
                <tr key={type._id}>
                  <td className="border px-4 py-2">{type._id}</td>
                  <td className="border px-4 py-2">{type.count}</td>
                  <td className="border px-4 py-2">
                    <ul>
                      {type.incidents.map(incident => (
                        <li key={incident.id}>
                          ID: {incident.id}, Location: {incident.location}, Date: {new Date(incident.date).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSection === 'statuses' && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Incident Statuses</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Count</th>
                <th className="border px-4 py-2">Incidents</th>
              </tr>
            </thead>
            <tbody>
              {incidentStatuses.map(status => (
                <tr key={status._id}>
                  <td className="border px-4 py-2">{status._id}</td>
                  <td className="border px-4 py-2">{status.count}</td>
                  <td className="border px-4 py-2">
                    <ul>
                      {status.incidents.map(incident => (
                        <li key={incident.id}>
                          ID: {incident.id}, Location: {incident.location}, Date: {new Date(incident.date).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;