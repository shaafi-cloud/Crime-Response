import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function IncidentDetail() {
  const { id } = useParams(); // Get the incident ID from the URL parameters
  const [incident, setIncident] = useState(null); // State to hold the incident data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(""); // State for error messages
  const [status, setStatus] = useState(""); // State for managing status

  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [officers, setOfficers] = useState([]); // List of officers
  const [selectedOfficer, setSelectedOfficer] = useState(""); // Selected officer ID
  const [priority, setPriority] = useState(""); // Priority for assignment

  useEffect(() => {
    // Fetch incident details
    const fetchIncident = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/incident/${id}`);
        setIncident(response.data.data);
        console.log(response.data.data);
        setStatus(response.data.data.status);
      } catch (error) {
        console.error("Failed to fetch incident:", error);
        setError("Failed to fetch incident details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch officers for assignment
    const fetchOfficers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/type/officer");
        setOfficers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch officers:", error);
      }
    };

    fetchIncident();
    fetchOfficers();
  }, [id]);

 

  const handleStatusChange = (e) => setStatus(e.target.value);

  const handleAssign = async () => {
    try {
      // Prepare data to send
      const assignedData = {
        incidentId: id,
        officerUsername: selectedOfficer,
        priority,
        typeOfIncident: incident.typeOfIncident,
        description: incident.description,
        location: incident.location,
        date: incident.date,
        evidence: incident.evidence,
        status
      };

          // Send assignment data to the backend
          await axios.post("http://localhost:5000/api/incident/assign", assignedData);
      
          alert("Incident assigned successfully!");
          setShowModal(false); // Close the modal after assignment
        } catch (error) {
          console.error("Error assigning incident:", error);
          alert("Error assigning incident.");
        };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!incident) return <div>No details available for this incident.</div>;  // Add this line


  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Incident Details</h1>

      <table className="w-full border-collapse mb-6">
        <tbody>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">ID</td>
            <td className="border p-2">{incident._id}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Type</td>
            <td className="border p-2">{incident.typeOfIncident}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Status</td>
            <td className="border p-2">
              <select 
                value={status} 
                onChange={handleStatusChange} 
                className="border p-2 rounded w-full"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Description</td>
            <td className="border p-2">{incident.description}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Location</td>
            <td className="border p-2">{incident.location}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Date</td>
            <td className="border p-2">{new Date(incident.date).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Evidence</td>
            <td className="border p-2">
              {incident.evidence ? (
                <img 
                  src={`http://localhost:5000/uploads/${incident.evidence}`} 
                  alt="Evidence" 
                  className="w-32 h-auto rounded-md"
                />
              ) : (
                <span>No evidence available</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Button to open modal for assigning to an officer */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        Assign to Officer
      </button>

      <Link to="/admin/incidents" className="inline-block text-blue-500 ml-6">
        Back to Incidents List
      </Link>

      {/* Modal for assigning to an officer */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">Assign Incident</h2>
            <label className="block mb-2">
              Officer:
              <select 
                value={selectedOfficer} 
                onChange={(e) => setSelectedOfficer(e.target.value)}
                className="block w-full p-2 border rounded"
              >
                <option value="">Select Officer</option>
                {officers.map((officer) => (
                  <option key={officer._id} value={officer._id}>
                    {officer.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-2">
              Priority:
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="block w-full p-2 border rounded"
              >
                <option value="" hidden>Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>
            <div className="flex justify-end mt-4">
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleAssign}
              >
                Assign
              </button>
              <button 
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
}

export default IncidentDetail;
