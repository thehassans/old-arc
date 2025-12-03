const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// Middleware to verify token (mock for now if not implemented)
const verifyToken = (req, res, next) => {
    // TODO: Implement actual JWT verification middleware
    req.user = { id: 1 }; // Mock user
    next();
};

router.post('/', verifyToken, orderController.createOrder);
router.get('/my-orders', verifyToken, orderController.getUserOrders);
router.get('/admin/all', verifyToken, orderController.getAllOrders);

module.exports = router;
