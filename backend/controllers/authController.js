const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const db = require('../config/db');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const register = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, result) => {
    if (err || result.length > 0) {
      return res.status(500).send('Error registering user or user already exists.');
    }

    bcrypt.hash(password, 8, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).send('Error hashing password.');
      }

      console.log('Hashed Password:', hashedPassword);
      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      const verificationLink = `http://localhost:3001/api/auth/verify?token=${verificationToken}`;

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Email Verification',
        text: `Click on the following link to verify your email: ${verificationLink}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Error sending verification email.');
        } else {
          console.log('Email sent:', info.response);

          User.createUser(email, hashedPassword, 'user', false, (err, result) => {
            if (err) {
              console.error('Error registering user:', err);
              return res.status(500).send('Error registering user.');
            }
            res.status(201).send('Registration successful. Please check your email to verify your account.');
          });
        }
      });
    });
  });
};

const verifyEmail = (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    User.verifyUser(email, (err, result) => {
      if (err) {
        console.error('Error verifying user:', err);
        return res.status(500).send('Error verifying user.');
      }
      console.log('User verified:', email);
      res.status(200).send('Email verified successfully. You can now log in.');
    });
  } catch (err) {
    console.error('Invalid or expired token:', err);
    res.status(400).send('Invalid or expired token.');
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, result) => {
    if (err || result.length === 0) {
      console.error('User not found:', email);
      return res.status(401).send('User not found.');
    }

    const user = result[0];

    if (!user.verified) {
      console.error('User not verified:', user.email);
      return res.status(403).send('Please verify your email before logging in.');
    }

    bcrypt.compare(password, user.password, (err, isValidPassword) => {
      if (err) {
        console.error('Error comparing password:', err);
        return res.status(500).send('Error comparing password.');
      }

      if (!isValidPassword) {
        console.error('Invalid password:', password);
        return res.status(401).send('Invalid password.');
      }

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      console.log('Login successful:', user.email);
      res.status(200).json({ token });
    });
  });
};

const initSuperAdmin = () => {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Super-admin email or password not set in environment variables');
    return;
  }

  bcrypt.hash(password, 8, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    }

    User.findUserByEmail(email, (err, result) => {
      if (err) {
        console.error('Error finding super-admin user:', err);
        return;
      }

      if (result.length > 0) {
        console.log('Super-admin user already exists');
        return;
      }

      const sql = 'INSERT INTO users (email, password, role, verified) VALUES (?, ?, ?, ?)';
      db.query(sql, [email, hashedPassword, 'super-admin', true], (err, result) => {
        if (err) {
          console.error('Error creating super-admin user:', err);
        } else {
          console.log('Super-admin user created successfully');
        }
      });
    });
  });
};

module.exports = { register, verifyEmail, login, initSuperAdmin };
