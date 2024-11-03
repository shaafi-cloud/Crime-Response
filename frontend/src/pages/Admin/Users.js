// src/pages/Users.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]); // State to hold fetched users
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for any error messages

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/all');
        setUsers(response.data.data); // Assuming your response structure is { data: users }
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {loading ? (
        <p>Loading...</p> // Display loading message
      ) : error ? (
        <p className="text-red-500">{error}</p> // Display error message
      ) : (
        <>
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
                <tr key={user._id}> {/* Use the unique _id for the key */}
                  <td className="border-b p-2">{user._id}</td>
                  <td className="border-b p-2">{user.username}</td>
                  <td className="border-b p-2">{user.type}</td>
                  <td className="border-b p-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

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
