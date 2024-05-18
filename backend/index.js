const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const timestamp = () => {
  const now = new Date();
  const formattedDate = `at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} on ${now.getDate()}:${now.getMonth() + 1}:${now.getFullYear()}`;
  return formattedDate;
};

app.post('/distance', (req, res) => {
  const message = req.body.message;
  console.log('Received message:', message , timestamp());
  res.send('Distance received successfully');
});

app.get('/', (req, res) => {
    res.send('Server is running successfully');
  });
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
