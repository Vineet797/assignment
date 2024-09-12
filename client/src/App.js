import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MaintenanceRequestForm from './MaintenanceRequestForm';
import AdminLogin from './AdminLogin';
import AdminPage from './AdminPage';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminLogin = () => {
    setIsAdmin(true);  // Set isAdmin to true when admin successfully logs in
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for residents to submit maintenance requests */}
          <Route path="/" element={<MaintenanceRequestForm />} />

          {/* Route for admin login */}
          <Route 
            path="/admin" 
            element={isAdmin ? <AdminPage /> : <AdminLogin onLogin={handleAdminLogin} />} 
          />

          {/* Route for admin page to view and close requests */}
          <Route path="/admin/requests" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
