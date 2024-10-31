import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddWash from './pages/AddWash';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));


  const handleLogin = () => {
    setIsAuthenticated(true);
  };



  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <Routes>
            <Route element={<DashboardLayout setIsAuthenticated={setIsAuthenticated} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-wash" element={<AddWash />} />
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
