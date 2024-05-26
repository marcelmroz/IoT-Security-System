const Threat = require('../models/Threat');

const logThreat = (req, res) => {
  const { message } = req.body;
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

  Threat.logThreat(message, timestamp, (err, result) => {
    if (err) {
      console.error('Error logging threat:', err);
      return res.status(500).send('Error logging threat.');
    }
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
