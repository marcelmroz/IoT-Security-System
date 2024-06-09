const db = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = (email, password, role, callback) => {
  const hashedPassword = bcrypt.hashSync(password, 8);
  const sql = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
  db.query(sql, [email, hashedPassword, role], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

module.exports = { createUser, findUserByEmail };
