const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const threatRoutes = require('./routes/threatRoutes');

app.use(express.json());


// app.use('/api/auth', authRoutes);
// app.use('/api/threats', threatRoutes);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

module.exports = app;
