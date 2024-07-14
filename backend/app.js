const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');
const threatRoutes = require('./routes/threatRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api/threats', threatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) throw err;
    res.send(`Database connected: ${results[0].solution}`);
  });
});

module.exports = app;
