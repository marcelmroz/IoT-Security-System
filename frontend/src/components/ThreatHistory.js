import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThreatHistory = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    axios.get('/api/threats/history', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setThreats(response.data);
    })
    .catch(error => {
      console.error('Error fetching threats', error);
    });
  }, []);

  return (
    <div>
      <h2>Threat History</h2>
      <ul>
        {threats.map(threat => (
          <li key={threat.id}>{threat.message} - {threat.timestamp}</li>
        ))}
      </ul>
    </div>
  );
};

export default ThreatHistory;
