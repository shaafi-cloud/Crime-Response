import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { NavLink } from 'react-router-dom';
import { TbProgressDown } from "react-icons/tb";
import { FaRegCheckSquare,FaEdit } from 'react-icons/fa';

function OfficerSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Officer Dashboard</h2>
      <nav>
      <ul>
      <li className="mb-2">
        <NavLink 
          to="/officer" 
          className={({ isActive }) => 
            `block py-2 px-4 rounded text-lg flex items-center 
            ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`
          }
        >
          <FaEdit className="mr-2 text-2xl" /> {/* Increased icon size */}
          Assigned Incidents
        </NavLink>
      </li>
      <li className="mb-2">
        <NavLink 
          to="/progress" 
          className={({ isActive }) => 
            `block py-2 px-4 rounded text-lg flex items-center 
            ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`
          }
        >
          <TbProgressDown className="mr-2 text-2xl" /> {/* Increased icon size */}
          Progress Incidents
        </NavLink>
      </li>

      <li className="mb-2">
        <NavLink 
          to="/resolved" 
          className={({ isActive }) => 
            `block py-2 px-4 rounded text-lg flex items-center 
            ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`
          }
        >
          <FaRegCheckSquare className="mr-2 text-2xl" /> {/* Increased icon size */}
          Resolved Incidents
        </NavLink>
      </li>

    </ul>
      </nav>
    </aside>
  );
}

export default OfficerSidebar;
