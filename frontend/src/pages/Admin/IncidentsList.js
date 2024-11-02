// src/pages/IncidentsList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const incidents = [
  { id: 1, type: 'Theft', status: 'Pending' },
  { id: 2, type: 'Assault', status: 'Resolved' },
  { id: 3, type: 'Fraud', status: 'In Progress' },
  // Add more incidents as needed
];

function IncidentsList() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase());
  
  const sortedIncidents = incidents
    .filter((incident) => incident.type.toLowerCase().includes(search))
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Incidents List</h1>
      
      <input 
        type="text" 
        placeholder="Search by type" 
        className="mb-4 p-2 border rounded w-full" 
        value={search} 
        onChange={handleSearchChange}
      />

      <select onChange={(e) => setSortField(e.target.value)} className="mb-4 p-2 border rounded">
        <option value="id">Sort by ID</option>
        <option value="type">Sort by Type</option>
        <option value="status">Sort by Status</option>
      </select>
      <select onChange={(e) => setSortOrder(e.target.value)} className="mb-4 p-2 border rounded">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">ID</th>
            <th className="border-b p-2 text-left">Type</th>
            <th className="border-b p-2 text-left">Status</th>
            <th className="border-b p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedIncidents.map((incident) => (
            <tr key={incident.id}>
              <td className="border-b p-2">{incident.id}</td>
              <td className="border-b p-2">{incident.type}</td>
              <td className="border-b p-2">{incident.status}</td>
              <td className="border-b p-2">
                <Link to={`/admin/incidents/${incident.id}`} className="text-blue-500">
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

export default IncidentsList;
