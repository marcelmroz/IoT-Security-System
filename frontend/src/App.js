import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import ThreatHistory from './components/ThreatHistory';
import MainPage from './components/MainPage';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    } else {
      setRole(null);
    }
  }, [token]);

  const setTokenInStorage = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    toast.success("Login successful!");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success("Logout successful!");
  };

  return (
    <Router>
      <Header token={token} setToken={setToken} role={role} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login setToken={setTokenInStorage} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/threat-history" element={<ThreatHistory />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
