const Threat = require('../models/Threat');
const moment = require('moment-timezone');
const nodemailer = require('nodemailer');
const db = require('../config/db');

const logThreat = (req, res) => {
  const { message } = req.body;
  const timestamp = moment().tz('Europe/Berlin').format('YYYY-MM-DD HH:mm:ss');

  Threat.logThreat(message, timestamp, (err, result) => {
    if (err) {
      console.error('Error logging threat:', err);
      return res.status(500).json({ error: 'Error logging threat.' });
    }
    const io = req.app.get('io');
    io.emit('new-threat', { message, timestamp });

    db.query('SELECT recipient_email FROM email_settings WHERE id = 1', (err, result) => {
      if (err) {
        console.error('Error fetching recipient email:', err);
        return res.status(500).json({ error: 'Error fetching recipient email.' });
      }
      
      const recipientEmail = result[0].recipient_email;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: recipientEmail,
        subject: 'Security Alert',
        text: `Potential threat detected: ${message} at ${timestamp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.status(200).json({ message: 'Threat logged successfully' });
    });
  });
};

const getThreats = (req, res) => {
  Threat.getThreats((err, results) => {
    if (err) {
      console.error('Error fetching threats:', err);  
      return res.status(500).json({ error: 'Error fetching threats.' });
    }
    res.status(200).json(results);
  });
};

const getEmailSettings = (req, res) => {
  const sql = 'SELECT recipient_email FROM email_settings WHERE id = 1';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching email settings:', err);
      return res.status(500).send('Error fetching email settings.');
    }
    res.status(200).json(result[0]);
  });
};

const updateEmailSettings = (req, res) => {
  const { recipient_email } = req.body;
  const sql = 'UPDATE email_settings SET recipient_email = ? WHERE id = 1';
  db.query(sql, [recipient_email], (err, result) => {
    if (err) {
      console.error('Error updating email settings:', err);
      return res.status(500).send('Error updating email settings.');
    }
    res.status(200).send('Email settings updated successfully.');
  });
};

module.exports = { logThreat, getThreats, getEmailSettings, updateEmailSettings };
