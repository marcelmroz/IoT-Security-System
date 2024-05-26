const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) throw err;
    res.send(`Database connected: ${results[0].solution}`);
  });
});

module.exports = app;
