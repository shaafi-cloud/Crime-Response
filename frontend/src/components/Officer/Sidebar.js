import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { NavLink } from "react-router-dom";
import { TbProgressDown } from "react-icons/tb";
import { FaRegCheckSquare, FaEdit } from "react-icons/fa";

function OfficerSidebar() {
  return (
    <aside className="w-64 bg-white text-gray-600 font-sans">
      <div className="flex items-center justify-center mt-8 mb-4">
        <div className="text-xl font-bold text-purple-700">Officer Dashboard</div>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="mb-4">
            <NavLink
              to="/officer"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded text-lg 
                ${isActive ? "text-purple-700" : "text-gray-600 hover:text-purple-700"}`}
            >
              <FaEdit className="mr-2 text-xl" />
              Assigned Incidents
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/progress"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded text-lg 
                ${isActive ? "text-purple-700" : "text-gray-600 hover:text-purple-700"}`}
            >
              <TbProgressDown className="mr-2 text-xl" />
              Progress Incidents
            </NavLink>
          </li>

          <li className="mb-4">
            <NavLink
              to="/resolved"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded text-lg 
                ${isActive ? "text-purple-700" : "text-gray-600 hover:text-purple-700"}`}
            >
              <FaRegCheckSquare className="mr-2 text-xl" />
              Resolved Incidents
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default OfficerSidebar;
