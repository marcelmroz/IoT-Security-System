const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/users', authenticateJWT, authorizeRoles(['admin']), (req, res) => {
  User.getUsers((err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Error fetching users.');
    }
    res.status(200).json(results);
  });
});

router.patch('/users/:id/role', authenticateJWT, authorizeRoles(['admin']), (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['user', 'approved-user', 'admin'].includes(role)) {
    return res.status(400).send('Invalid role.');
  }

  User.updateUserRole(id, role, (err, result) => {
    if (err) {
      console.error('Error updating user role:', err);
      return res.status(500).send('Error updating user role.');
    }
    res.status(200).send('User role updated.');
  });
});

module.exports = router;
