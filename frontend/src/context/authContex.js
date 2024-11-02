// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // null initially
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token, role } = response.data;

      // Save token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setUserRole(role);
      setIsAuthenticated(true);

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'officer') {
        navigate('/officer');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUserRole(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    // Check if user is already authenticated on mount
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
