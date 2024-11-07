import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddWash from './pages/AddWash';
import Login from './pages/Login';
import Admin from './pages/Admin'
import DashboardLayout from './components/DashboardLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));


  const handleLogin = () => {
    setIsAuthenticated(true);
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      window.location.href('/admin');
    } else {
      window.location.href('/')
    }
  };



  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <Routes>
            <Route element={<DashboardLayout setIsAuthenticated={setIsAuthenticated} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-wash" element={<AddWash />} />
              <Route
                path='/admin'
                element={
                  localStorage.getItem('role') === 'admin' ? (
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
