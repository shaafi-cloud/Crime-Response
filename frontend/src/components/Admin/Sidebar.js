import React from 'react';
import { Link } from 'react-router-dom';

function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link to="/admin" className="block py-2 px-4 rounded hover:bg-gray-700">Overview</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/incidents" className="block py-2 px-4 rounded hover:bg-gray-700">Incidents List</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">Users</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
