// src/pages/Users.js
import React from 'react';
import { Link } from 'react-router-dom';

function Users() {
  // Sample users data; in a real app, you would fetch this data from the backend
  const users = [
    { id: 1, name: 'John Doe', role: 'Admin', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', role: 'Officer', email: 'jane@example.com' },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <h2 className="text-xl font-bold mt-6 mb-4">Users List</h2>
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">ID</th>
            <th className="border-b p-2 text-left">Name</th>
            <th className="border-b p-2 text-left">Role</th>
            <th className="border-b p-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-b p-2">{user.id}</td>
              <td className="border-b p-2">{user.name}</td>
              <td className="border-b p-2">{user.role}</td>
              <td className="border-b p-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to navigate to Register Officer page */}
      <Link to="/admin/register-officer">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Officer
        </button>
      </Link>
    </div>
  );
}

export default Users;
