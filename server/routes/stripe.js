const express = require('express');
const router = express.Router();

// In-memory orders store (replace with database in production)
let orders = [];
let orderIdCounter = 1;

// Initialize Stripe only if key is provided
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
    try {
        const { items, customerEmail } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items provided' });
        }

        // If Stripe not configured or invalid, create demo order directly
        if (!stripe || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('ABC123')) {
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal > 80 ? 0 : 12;
            
            const order = {
                id: orderIdCounter++,
                order_number: `ORD-${String(orderIdCounter).padStart(4, '0')}`,
                stripe_session_id: null,
                payment_method: 'card',
                customer_email: customerEmail || 'customer@example.com',
                customer_name: 'Card Customer',
                items: items,
                total_amount: subtotal + shipping,
                status: 'Processing',
                scheduled_date: null,
                scheduled_time: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            orders.push(order);
            return res.json({ 
                success: true, 
                demoOrder: true,
                order: order
            });
        }

        // Create line items for Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: item.title,
                    images: item.image_url ? [item.image_url] : [],
                },
                unit_amount: Math.round(item.price * 100), // Convert to pence
            },
            quantity: item.quantity,
        }));

        // Calculate shipping
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 80 ? 0 : 12;

        // Add shipping as a line item if applicable
        if (shipping > 0) {
            lineItems.push({
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: 'Shipping',
                    },
                    unit_amount: shipping * 100,
                },
                quantity: 1,
            });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'https://old-arcade.com'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || 'https://old-arcade.com'}/cart`,
            customer_email: customerEmail || undefined,
            metadata: {
                items: JSON.stringify(items.map(item => ({
                    id: item.id,
                    title: item.title,
                    quantity: item.quantity,
                    price: item.price
                })))
            }
        });

        res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Verify session and create order
router.get('/verify-session/:sessionId', async (req, res) => {
    try {
        if (!stripe) {
            return res.status(503).json({ error: 'Stripe not configured' });
        }
        
        const { sessionId } = req.params;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // Check if order already exists
            const existingOrder = orders.find(o => o.stripe_session_id === sessionId);
            if (existingOrder) {
                return res.json({ success: true, order: existingOrder });
            }

            // Create new order
            const items = JSON.parse(session.metadata.items || '[]');
            const order = {
                id: orderIdCounter++,
                order_number: `ORD-${String(orderIdCounter).padStart(4, '0')}`,
                stripe_session_id: sessionId,
                customer_email: session.customer_email || session.customer_details?.email,
                customer_name: session.customer_details?.name || 'Guest',
                items: items,
                total_amount: session.amount_total / 100,
                status: 'Processing',
                scheduled_date: null,
                scheduled_time: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            orders.push(order);
            res.json({ success: true, order });
        } else {
            res.json({ success: false, message: 'Payment not completed' });
        }
    } catch (error) {
        console.error('Session verification error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create Cash on Delivery order
router.post('/create-cod-order', async (req, res) => {
    try {
        const { items, customer, total_amount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items provided' });
        }

        if (!customer || !customer.name || !customer.email || !customer.phone || !customer.address) {
            return res.status(400).json({ error: 'Customer details are required' });
        }

        const order = {
            id: orderIdCounter++,
            order_number: `ORD-${String(orderIdCounter).padStart(4, '0')}`,
            stripe_session_id: null,
            payment_method: 'cod',
            customer_email: customer.email,
            customer_name: customer.name,
            customer_phone: customer.phone,
            customer_address: customer.address,
            items: items,
            total_amount: total_amount,
            status: 'Pending',
            scheduled_date: null,
            scheduled_time: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        orders.push(order);
        res.json({ success: true, order });
    } catch (error) {
        console.error('COD order error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get order by ID (for COD success page)
router.get('/orders/:orderId', (req, res) => {
    const { orderId } = req.params;
    const order = orders.find(o => o.id === parseInt(orderId));
    
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ success: true, order });
});

// Get all orders (admin)
router.get('/orders', (req, res) => {
    res.json(orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
});

// Update order (admin - change status, date, time, order date)
router.put('/orders/:orderId', (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, scheduled_date, scheduled_time, order_date } = req.body;

        const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));
        if (orderIndex === -1) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (status) orders[orderIndex].status = status;
        if (scheduled_date !== undefined) orders[orderIndex].scheduled_date = scheduled_date;
        if (scheduled_time !== undefined) orders[orderIndex].scheduled_time = scheduled_time;
        if (order_date) orders[orderIndex].created_at = new Date(order_date).toISOString();
        orders[orderIndex].updated_at = new Date().toISOString();

        res.json({ success: true, order: orders[orderIndex] });
    } catch (error) {
        console.error('Order update error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Delete order (admin)
router.delete('/orders/:orderId', (req, res) => {
    try {
        const { orderId } = req.params;
        const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));
        
        if (orderIndex === -1) {
            return res.status(404).json({ error: 'Order not found' });
        }

        orders.splice(orderIndex, 1);
        res.json({ success: true });
    } catch (error) {
        console.error('Order delete error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Stripe webhook for automatic order creation
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    if (!stripe) {
        return res.status(503).json({ error: 'Stripe not configured' });
    }
    
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        // Check if order already exists
        const existingOrder = orders.find(o => o.stripe_session_id === session.id);
        if (!existingOrder) {
            const items = JSON.parse(session.metadata?.items || '[]');
            const order = {
                id: orderIdCounter++,
                order_number: `ORD-${String(orderIdCounter).padStart(4, '0')}`,
                stripe_session_id: session.id,
                customer_email: session.customer_email || session.customer_details?.email,
                customer_name: session.customer_details?.name || 'Guest',
                items: items,
                total_amount: session.amount_total / 100,
                status: 'Processing',
                scheduled_date: null,
                scheduled_time: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            orders.push(order);
        }
    }

    res.json({ received: true });
});

module.exports = router;
