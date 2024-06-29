const Threat = require('../models/Threat');
const moment = require('moment-timezone');
const nodemailer = require('nodemailer');

const logThreat = (req, res) => {
  const { message } = req.body;
  const timestamp = moment().tz('Europe/Berlin').format('YYYY-MM-DD HH:mm:ss');

  Threat.logThreat(message, timestamp, (err, result) => {
    if (err) {
      console.error('Error logging threat:', err);
      return res.status(500).send('Error logging threat.');
    }
    const io = req.app.get('io');
    io.emit('new-threat', { message, timestamp });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });    

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.RECIPIENT_EMAIL,
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

    res.status(200).send('Threat logged successfully');
  });
};

const getThreats = (req, res) => {
  Threat.getThreats((err, results) => {
    if (err) {
      console.error('Error fetching threats:', err);  
      return res.status(500).send('Error fetching threats.');
    }
    res.status(200).json(results);
  });
};

module.exports = { logThreat, getThreats };
