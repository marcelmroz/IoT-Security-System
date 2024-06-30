import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const ThreatHistory = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const response = await axios.get('/api/threats/history', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setThreats(response.data);
      } catch (error) {
        console.error('Error fetching threats', error);
      }
    };

    fetchThreats();

    socket.on('new-threat', (newThreat) => {
      setThreats((prevThreats) => [...prevThreats, newThreat]);
    });

    return () => {
      socket.off('new-threat');
    };
  }, []);

  return (
    <div>
      <h2>Threat History</h2>
      <ul>
        {threats.map((threat, index) => (
          <li key={index}>{threat.message} - {threat.timestamp}</li>
        ))}
      </ul>
    </div>
  );
};

export default ThreatHistory;
