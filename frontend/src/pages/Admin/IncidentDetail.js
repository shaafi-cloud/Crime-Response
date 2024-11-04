import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function IncidentDetail() {
  const { id } = useParams(); // Get the incident ID from the URL parameters
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null); // State to hold the incident data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(""); // State for error messages
  const [status, setStatus] = useState(""); // State for managing status

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/incident/${id}`);
        setIncident(response.data.data); // Set incident data
        setStatus(response.data.data.status); // Set initial status
      } catch (error) {
        console.error("Failed to fetch incident:", error);
        setError("Failed to fetch incident details. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchIncident(); // Call the function to fetch incident
  }, [id]);

  const handleAssignClick = () => {
    navigate(`/assign-incident/${id}`);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    console.log(`Status for Incident ${id} updated to: ${e.target.value}`);
    // Here you would typically call the backend to update the status in the database
  };

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div className="text-red-500">{error}</div>; // Error state

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
          {/* Evidence column for the incident image */}
          <tr>
            <td className="border p-2 font-semibold bg-gray-100">Evidence</td>
            <td className="border p-2">
              {incident.evidence ? (
                <img 
                  src={`http://localhost:5000/uploads/${incident.evidence}`} // Adjust the path as necessary
                  alt="Evidence" 
                  className="w-32 h-auto rounded-md" // Adjust size as needed
                />
              ) : (
                <span>No evidence available</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Button to navigate to AssignIncident page */}
      <Link to={`/admin/assignIncident`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Assign to Officer
        </button>
      </Link>

      <Link to="/admin/incidents" className="inline-block text-blue-500">
        Back to Incidents List
      </Link>
    </div>
  );
}

export default IncidentDetail;