const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const secretHeader = req.header('x-esp32-secret');

  if (secretHeader && secretHeader === process.env.ESP32_SECRET) {
    return next();
  }

  if (!authHeader) {
    return res.status(403).send('Access denied. No token provided.');
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(403).send('Access denied. Token not found.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token.');
  }
};

const authorizeRoles = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send('Access denied.');
  }
  next();
};

module.exports = { authenticateJWT, authorizeRoles };
