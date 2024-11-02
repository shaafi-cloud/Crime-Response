// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './components/Admin/Sidebar';
import OfficerSidebar from './components/Officer/Sidebar';
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
import ReportIncident from './pages/ReportIncident'; // Import the Report Incident component

const userRole = 'admin'; 

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {userRole === 'admin' ? <AdminSidebar /> : userRole === 'officer' ? <OfficerSidebar /> : null}

        <main className={`flex-1 p-6 ${userRole ? '' : 'flex items-center justify-center'}`}>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/report-incident" element={<ReportIncident />} /> {/* Add the Report Incident route */}

            {/* Admin Routes */}
            {userRole === 'admin' && (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/incidents" element={<IncidentsList />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/incidents/:id" element={<IncidentDetail />} />
                <Route path="/admin/register-officer" element={<RegisterOfficer />} />
              </>
            )}

            {/* Officer Routes */}
            {userRole === 'officer' && (
              <>
                          {/* Pending incident */}
                <Route path="/officer" element={<OfficerDashboard />} />
                <Route path="/officer/incidents/:id" element={<OfficerIncidentDetail />} />
                              {/* Progress incident */}
                <Route path="/progress" element={<ProgressIncident />} />
                <Route path="/progress/progress/:id" element={<ProgressIncidentDetail />} />
                              {/* Resolved incident */}
                <Route path="/resolved" element={<ResolvedIncident />} />
                <Route path="/resolved/resolved/:id" element={<ResolvedIncidentDetail />} />
              </>
            )}

            {!userRole && <Route path="*" element={<Navigate to="/login" replace />} />}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
