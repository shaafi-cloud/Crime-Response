import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterOfficer() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Officer'); // Default value for type is 'Officer'
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // If type is empty, set it to 'Officer'
    const finalType = type.trim() === '' ? 'Officer' : type;

    try {
      const response = await axios.post('http://localhost:5000/api/users/add', {
        username,
        email,
        password,
        type: finalType, // Send the determined type
      });
      if (response.data.success) {
        alert(`New officer registered: ${username}`);
        navigate('/users'); // Redirect to Users page after successful registration
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register officer. Please try again.'); // Optional: Inform the user of the error
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Register New Officer</h1>
      
      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded mb-2 w-full"
        value={username}
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
      
      {/* Input for type with default value */}
      <input
        type="text"
        placeholder=" Officer"
        value={type}
        className="border p-2 rounded mb-4 w-full"
        readOnly
        onChange={(e) => setType(e.target.value)}
      />

      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">
        Register Officer
      </button>
    </div>
  );
}

export default RegisterOfficer;
