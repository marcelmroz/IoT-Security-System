const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const db = require('../config/db');

const register = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, result) => {
    if (err || result.length > 0) {
      return res.status(500).send('Error registering user or user already exists.');
    }

    User.createUser(email, password, (err, result) => {
      if (err) {
        return res.status(500).send('Error registering user.');
      }
      res.status(201).send('User registered.');
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).send('User not found.');
    }

    const user = result[0];
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send('Invalid password.');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  });
};

const initAdmin = () => {
  const email = process.env.ADMIN_EMAIL;
  const password = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8);

  User.findUserByEmail(email, (err, result) => {
    if (err) {
      console.error('Error finding admin user:', err);
      return;
    }

    if (result.length > 0) {
      console.log('Admin user already exists');
      return;
    }

    const sql = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    db.query(sql, [email, password, 'admin'], (err, result) => {
      if (err) {
        console.error('Error creating admin user:', err);
      } else {
        console.log('Admin user created successfully');
      }
    });
  });
};

module.exports = { register, login, initAdmin };
