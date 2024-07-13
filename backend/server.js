const app = require('./app');
const http = require('http');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const { initSuperAdmin } = require('./controllers/authController');

const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIo(server);

app.set('io', io);

initSuperAdmin();

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
