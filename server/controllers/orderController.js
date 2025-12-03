const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    try {
        const { items, total_amount } = req.body;
        const userId = req.user.id; // From auth middleware

        const order = await Order.create({ user_id: userId, total_amount });

        for (const item of items) {
            await OrderItem.create({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            });
        }

        res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { user_id: req.user.id },
            include: [{ model: OrderItem, include: [Product] }]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{ model: OrderItem, include: [Product] }]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
