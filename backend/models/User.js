const db = require('../config/db');

const createUser = (email, password, role = 'user', verified = false, callback) => {
  const sql = 'INSERT INTO users (email, password, role, verified) VALUES (?, ?, ?, ?)';
  db.query(sql, [email, password, role, verified], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

const findUserById = (id, callback) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], callback);
};

const getUsers = (callback) => {
  const sql = 'SELECT id, email, role FROM users';
  db.query(sql, callback);
};

const updateUserRole = (id, role, callback) => {
  const sql = 'UPDATE users SET role = ? WHERE id = ?';
  db.query(sql, [role, id], callback);
};

const verifyUser = (email, callback) => {
  const sql = 'UPDATE users SET verified = true WHERE email = ?';
  db.query(sql, [email], callback);
};

module.exports = { createUser, findUserByEmail, findUserById, getUsers, updateUserRole, verifyUser };
