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

module.exports = { logThreat };
