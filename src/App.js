import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddRecord from './pages/AddRecord';
import Login from './pages/Login';
import Admin from './pages/Admin';
import DashboardLayout from './components/DashboardLayout';
import { getLatestFuelPrice } from './api/api';
import { toast } from 'react-hot-toast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = async () => {
    try {
      const fuelData = await getLatestFuelPrice();
      if (fuelData?.price) {
        console.log("Fetched fuel price:", fuelData.price);
        localStorage.setItem('fuel_price', fuelData.price.toString());
      }
    } catch (error) {
      toast.error("Failed to fetch fuel price on login.");
    }

    setIsAuthenticated(true);
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/';
    }
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <Routes>
            <Route element={<DashboardLayout setIsAuthenticated={setIsAuthenticated} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-record" element={<AddRecord />} />
              <Route
                path="/admin"
                element={
                  localStorage.getItem("role") === "admin" ? (
                    <Admin />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Route>
          </Routes>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
