const express = require('express');
const router = express.Router();
const threatController = require('../controllers/threatController');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/log', authenticateJWT, threatController.logThreat);
router.get('/history', authenticateJWT, authorizeRoles(['admin', 'super-admin', 'approved-user']), threatController.getThreats);

module.exports = router;
