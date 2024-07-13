import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; 

const Header = ({ token, setToken, role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate('/')}>Home</button>
          </li>
          {!token && (
            <>
              <li>
                <button onClick={() => navigate('/login')}>Login</button>
              </li>
              <li>
                <button onClick={() => navigate('/register')}>Register</button>
              </li>
            </>
          )}
          {token && (role === 'admin' || role === 'super-admin') && (
            <li>
              <button onClick={() => navigate('/admin')}>Admin Panel</button>
            </li>
          )}
          {token && (role === 'admin' || role === 'super-admin' || role === 'approved-user') && (
            <li>
              <button onClick={() => navigate('/threat-history')}>Threat History</button>
            </li>
          )}
          {token && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
