const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const wardenController = require('../controllers/wardenController');
const slotController = require('../controllers/slotController');

// Warden registration and login routes
router.post('/register', wardenController.register);
router.post('/login', wardenController.login);

// Slot related routes
router.get('/wardens', slotController.viewAllWardens);
router.post('/book/:wardenId/:sessionDate', verifyToken, slotController.bookSlot);
router.get('/sessions', verifyToken, slotController.viewOwnSessions);

module.exports = router;
