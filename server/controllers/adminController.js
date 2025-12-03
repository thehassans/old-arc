const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Query = require('../models/Query');

exports.getStats = async (req, res) => {
    try {
        const totalOrders = await Order.count();
        const totalProducts = await Product.count();
        const totalUsers = await User.count();
        const totalQueries = await Query.count();

        // Calculate total revenue (mock calculation if total_amount is string)
        const orders = await Order.findAll();
        const totalRevenue = orders.reduce((acc, order) => acc + parseFloat(order.total_amount || 0), 0);

        res.json({
            totalOrders,
            totalProducts,
            totalUsers,
            totalQueries,
            totalRevenue
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getQueries = async (req, res) => {
    try {
        const queries = await Query.findAll({ order: [['created_at', 'DESC']] });
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.submitQuery = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await Query.create({ name, email, message });
        res.status(201).json({ message: 'Query submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
