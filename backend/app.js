const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const threatRoutes = require('./routes/threatRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) throw err;
    res.send(`Database connected: ${results[0].solution}`);
  });
});

app.use('/api/threats', threatRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
