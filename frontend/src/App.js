import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ThreatHistory from './components/ThreatHistory';
import MainPage from './components/MainPage';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setTokenInStorage = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login setToken={setTokenInStorage} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/threat-history" element={<ThreatHistory />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
