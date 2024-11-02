import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { NavLink } from 'react-router-dom';
import { FaUserFriends,FaListAlt, FaSignOutAlt  } from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";

function AdminSidebar( {onLogout}) {
  return (
    <aside className="w-64 bg-gray-200 text-2xl font-bold mb-2">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav>
      <ul>
      <li className="mb-2">
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => 
            `block py-2 px-4 rounded text-lg flex items-center 
            ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'}`
          }
        >
          <RiAdminFill className="mr-2 text-2xl" /> {/* Increased icon size */}
          Overview
        </NavLink>
      </li>
      <li className="mb-2">
        <NavLink 
          to="/admin_incidents" 
          className={({ isActive }) => 
            `block py-2 px-4 rounded text-lg flex items-center 
            ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'}`
          }
        >
          <FaListAlt className="mr-2 text-2xl" /> {/* Increased icon size */}
          Incident List
        </NavLink>
      </li>

      <li className="mb-2">
        <NavLink 
          to="/admin_users" 
          className={({ isActive }) => 
            `block py-2 px-4 rounded text-lg flex items-center 
            ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'}`
          }
        >
          <FaUserFriends className="mr-2 text-2xl" /> {/* Increased icon size */}
          Users
        </NavLink>
      </li>

    </ul>
    <button
        onClick={onLogout}
        className="block w-full text-left py-2 px-4 rounded text-lg flex items-center text-gray-800 hover:bg-gray-200 mt-6"
      >
        <FaSignOutAlt className="mr-2 text-2xl" />
        Logout
      </button>

      </nav>
    </aside>
  );
}

export default AdminSidebar;
