import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterOfficer() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Officer");
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!username || !email || !password) {
      setDialogMessage("Please fill in all the fields.");
      setShowDialog(true);
      return;
    }

    // If type is empty, set it to 'Officer'
    const finalType = type.trim() === "" ? "Officer" : type;

    try {
      const response = await axios.post("http://localhost:5000/api/users/add", {
        username,
        email,
        password,
        type: finalType,
      });
      if (response.data.success) {
        setDialogMessage(`New officer registered: ${username}`);
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setDialogMessage("Failed to register officer. Please try again.");
      setShowDialog(true);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setName("");
    setEmail("");
    setPassword("");
    setType("Officer");
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

      <input
        type="text"
        placeholder="Officer"
        value={type}
        className="border p-2 rounded mb-4 w-full"
        readOnly
        onChange={(e) => setType(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register Officer
      </button>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Notification</h2>
            <p className="mb-4">{dialogMessage}</p>
            <button
              onClick={handleDialogClose}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterOfficer;
