import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    axios.get('/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
  }, []);

  const handleRoleChange = () => {
    axios.patch(`/api/admin/users/${selectedUserId}/role`, { role: newRole }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      alert('User role updated');
      setUsers(users.map(user => user.id === selectedUserId ? { ...user, role: newRole } : user));
    })
    .catch(error => {
      console.error('Error updating user role:', error);
    });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email} - {user.role}
            <button onClick={() => setSelectedUserId(user.id)}>Change Role</button>
          </li>
        ))}
      </ul>
      {selectedUserId && (
        <div>
          <h3>Change Role</h3>
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="approved-user">Approved User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleRoleChange}>Update Role</button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
