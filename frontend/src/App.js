import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from './components/Admin/Sidebar';
import OfficerSidebar from './components/Officer/Sidebar';
import UserSidebar from './components/user/UserSidebar';
import AdminDashboard from './pages/Admin/AdminDashboard';
import IncidentsList from './pages/Admin/IncidentsList';
import IncidentDetail from './pages/Admin/IncidentDetail';
import RegisterOfficer from './pages/Admin/RegisterOfficer';
import OfficerDashboard from './pages/Officer/OfficerDashboard';

import ProgressIncident from './pages/Officer/ProgressIncident';
import ProgressIncidentDetail from './pages/Officer/ProgressIncidentDetail';
import ResolvedIncident from './pages/Officer/ResolvedIncident';
import ResolvedIncidentDetail from './pages/Officer/ResolvedIncidentDetail';
import OfficerIncidentDetail from './pages/Officer/OfficerIncidentDetail';
import Users from './pages/Admin/Users';
import LoginForm from './pages/Login';
import SignupForm from './pages/Signup';
import ReportIncident from './pages/ReportIncident';
import AssignIncident from './pages/Admin/AssignIncident';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Clear the token from localStorage and reset authentication state
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    // Check if user is logged in by checking token
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserRole = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/role', {
            headers: { Authorization: `Bearer ${token}` }
          });
          // console.log("the session id: ",response.data.role );
          console.log(response.data.role);
          setUserRole(response.data.role);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user role:', error);
          setIsAuthenticated(false);
        }
      };
      fetchUserRole();
    }
  }, []);

  if (!isAuthenticated) {
    // If not authenticated, allow access to login and signup pages
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* Conditionally render the sidebar based on user role */}
        {userRole === 'admin' && <AdminSidebar onLogout={handleLogout} />}
        {userRole === 'Officer' && <OfficerSidebar onLogout={handleLogout} />}
        {userRole === 'user' && <UserSidebar onLogout={handleLogout} />}
        
        

        <main className="flex-1 p-6">
          <Routes>
            {/* Admin Routes */}
            {userRole === 'admin' && (
              <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/incidents" element={<IncidentsList />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/incidents/:id" element={<IncidentDetail />} />
                <Route path="/admin/register-officer" element={<RegisterOfficer />} />
                {/* <Route path="/admin/assignIncident" element={<AssignIncident />} /> */}
                <Route path="/admin/assignIncident" element={<AssignIncident />} />
              </>
            )}

            {/* Officer Routes */}
            {userRole === 'Officer' && (
              <>
                <Route path="/officer/incidents" element={<OfficerDashboard />} />
                <Route path="/officer/incidents/:id" element={<OfficerIncidentDetail />} />
                <Route path="/progress" element={<ProgressIncident />} />
                <Route path="/progress/progress/:id" element={<ProgressIncidentDetail />} />
                <Route path="/resolved" element={<ResolvedIncident />} />
                <Route path="/resolved/resolved/:id" element={<ResolvedIncidentDetail />} />
              </>
            )}

            {/* User Role: Redirect to ReportIncident */}
            {userRole === 'user' && (
                
              
              <Route path="/report-incident" element={<ReportIncident />} />
              
            )}

            {/* Redirect to appropriate dashboard based on user role */}
            <Route
              path="*"
              element={
                userRole === 'admin'
                  ? <Navigate to="/admin/dashboard" replace />
                  : userRole === 'Officer'
                  ? <Navigate to="/officer" replace />
                  : <Navigate to="/report-incident" replace />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
