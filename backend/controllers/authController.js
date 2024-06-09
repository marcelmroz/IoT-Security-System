const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const register = (req, res) => {
  const { email, password, role } = req.body;

  User.createUser(email, password, role, (err, result) => {
    if (err) {
      return res.status(500).send('Error registering user.');
    }
    res.status(201).send('User registered.');
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

module.exports = { register, login };
