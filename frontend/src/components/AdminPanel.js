import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/AdminPanel.css'; 

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
    const user = users.find(u => u.id === selectedUserId);

    if (user.role === 'super-admin' && localStorage.getItem('role') !== 'super-admin') {
      toast.error('You are not allowed to change the role of the super-admin.');
      return;
    }

    axios.patch(`/api/admin/users/${selectedUserId}/role`, { role: newRole }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      toast.success('User role updated');
      setUsers(users.map(user => user.id === selectedUserId ? { ...user, role: newRole } : user));
    })
    .catch(error => {
      console.error('Error updating user role:', error);
      toast.error('Error updating user role');
    });
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.email} - {user.role}</span>
            {(user.role !== 'super-admin' || localStorage.getItem('role') === 'super-admin') && (
              <button onClick={() => setSelectedUserId(user.id)}>Change Role</button>
            )}
          </li>
        ))}
      </ul>
      {selectedUserId && (
        <div className="role-change-form">
          <h3>Change Role</h3>
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="approved-user">Approved User</option>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>
          <button onClick={handleRoleChange}>Update Role</button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
