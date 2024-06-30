import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
        <li>
            <Link to="/">Main Page</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/threat-history">Threat History</Link>
          </li>
          <li>
            <Link to="/admin">Admin Panel</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
