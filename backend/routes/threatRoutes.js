const express = require('express');
const router = express.Router();
const threatController = require('../controllers/threatController');

router.post('/log', threatController.logThreat);

module.exports = router;
