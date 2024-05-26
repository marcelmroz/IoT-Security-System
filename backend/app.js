const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const threatRoutes = require('./routes/threatRoutes');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

app.use('/api/threats', threatRoutes);

module.exports = app;
