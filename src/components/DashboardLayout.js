import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };


  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 overflow-y-auto h-screen p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
