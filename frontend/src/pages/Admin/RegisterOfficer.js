// src/pages/RegisterOfficer.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterOfficer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // New password state
  const navigate = useNavigate();

  const handleRegister = () => {
    // In a real application, this data would be sent to the backend to create the user
    const newOfficer = { name, email, password, role: 'Officer' };
    console.log('Registering officer:', newOfficer);
    alert(`New officer registered: ${name}`);
    
    // Redirect to Users page after registration
    navigate('/users');
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Register New Officer</h1>
      
      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded mb-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded mb-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded mb-4 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      {/* Fixed "Officer" role */}
      <div className="border p-2 rounded mb-4 w-full bg-gray-100">
        Officer
      </div>

      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">
        Register Officer
      </button>
    </div>
  );
}

export default RegisterOfficer;
