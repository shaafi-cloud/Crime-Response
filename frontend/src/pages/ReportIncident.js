import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReportIncident() {
  // State to control the visibility of witness fields
  const [isNotBystander, setIsNotBystander] = useState(false);
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFile = (e) => {
    setEvidence(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("typeOfIncident", type);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("evidence", evidence);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/incident/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log("Registration failed", error);
      setError("Registering incident failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Report an Incident
      </h2>
      <form onSubmit={handleRegister} className="grid grid-cols-2 gap-6">
        {/* Type of Incident */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Type of Incident
          </label>
          <input
            type="text"
            placeholder="Enter incident type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            placeholder="Describe the incident..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>

        {/* Evidence */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Evidence (optional)
          </label>
          <input
            type="file"
            onChange={handleFile}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Are you a bystander? */}
        {/* <div className="col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Are you a bystander?</label>
          <select
            onChange={(e) => setIsNotBystander(e.target.value === 'no')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}

        {/* Conditional Witness Fields */}
        {/* {isNotBystander && (
          <>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Witness Name</label>
              <input
                type="text"
                placeholder="Enter witness name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Witness Phone</label>
              <input
                type="text"
                placeholder="Enter witness phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )} */}

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportIncident;
