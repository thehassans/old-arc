const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// TODO: Add admin auth middleware
router.get('/stats', adminController.getStats);
router.get('/queries', adminController.getQueries);
router.post('/queries', adminController.submitQuery); // Public endpoint for users to contact

module.exports = router;
