const db = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = (email, password, role = 'user', callback) => {
  const hashedPassword = bcrypt.hashSync(password, 8);
  const sql = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
  db.query(sql, [email, hashedPassword, role], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

const getUsers = (callback) => {
  const sql = 'SELECT id, email, role FROM users';
  db.query(sql, callback);
};

const updateUserRole = (id, role, callback) => {
  const sql = 'UPDATE users SET role = ? WHERE id = ?';
  db.query(sql, [role, id], callback);
};

module.exports = { createUser, findUserByEmail, getUsers, updateUserRole };
