import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';

const MainPage = ({ token, role }) => {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <h1>Welcome to your Security System</h1>
      {token ? (
        <div className="welcome-message">
          <p>Hello!</p>
          {role === 'user' && (
            <p>Contact the admin to get access to the threat history.</p>
          )}
          {role === 'approved-user' && (
            <p>You can now view the <button onClick={() => navigate('/threat-history')}>Threat History</button>.</p>
          )}
          {role === 'admin' && (
            <p>As an admin, you can manage users and view the <button onClick={() => navigate('/threat-history')}>Threat History</button>.</p>
          )}
          {role === 'super-admin' && (
            <p>As a super-admin, you have full access to the system and can view the <button onClick={() => navigate('/threat-history')}>Threat History</button>.</p>
          )}
        </div>
      ) : (
        <div className="login-prompt">
          <p>Please <button onClick={() => navigate('/login')}>log in</button> to access the system.</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
