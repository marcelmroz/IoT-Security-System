const express = require('express');
const router = express.Router();
const threatController = require('../controllers/threatController');

router.post('/log', threatController.logThreat);
router.get('/history', threatController.getThreats);

module.exports = router;
