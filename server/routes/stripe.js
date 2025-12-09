const express = require('express');
const router = express.Router();

// In-memory orders store (replace with database in production)
let orders = [];
let orderIdCounter = 1;

// In-memory products store with default products
let products = [
    { id: 1, title: 'Retro Console X', description: 'The ultimate retro gaming experience with 5000+ games.', price: 159.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80', stock: 50, created_at: new Date().toISOString() },
    { id: 2, title: 'Wireless Pro Controller', description: 'Ergonomic design with precision analogue sticks.', price: 44.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80', stock: 100, created_at: new Date().toISOString() },
    { id: 3, title: 'Arcade Fighting Stick', description: 'Tournament-grade arcade stick with Sanwa buttons.', price: 109.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80', stock: 30, created_at: new Date().toISOString() },
    { id: 4, title: 'Classic Game Bundle', description: 'Collection of 10 retro classic titles.', price: 69.99, category: 'Games', image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80', stock: 200, created_at: new Date().toISOString() },
    { id: 5, title: 'Handheld Retro Console', description: 'Portable gaming with 3.5" screen.', price: 124.99, category: 'Consoles', image_url: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=600&q=80', stock: 75, created_at: new Date().toISOString() },
    { id: 6, title: 'Arcade Neon Sign', description: 'LED neon sign to light up your gaming space.', price: 64.99, category: 'Merch', image_url: 'https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=600&q=80', stock: 40, created_at: new Date().toISOString() },
    { id: 7, title: 'Gaming Headset RGB', description: '7.1 surround sound with noise cancellation.', price: 79.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=600&q=80', stock: 60, created_at: new Date().toISOString() },
    { id: 8, title: 'Controller Charging Dock', description: 'Dual charging station with LED indicators.', price: 24.99, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80', stock: 150, created_at: new Date().toISOString() },
];
let productIdCounter = 9;

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

// Create PayPal order (after PayPal payment is captured)
router.post('/create-paypal-order', async (req, res) => {
    try {
        const { items, paypal_order_id, payer, total_amount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items provided' });
        }

        const order = {
            id: orderIdCounter++,
            order_number: `ORD-${String(orderIdCounter).padStart(4, '0')}`,
            stripe_session_id: null,
            paypal_order_id: paypal_order_id || null,
            payment_method: 'paypal',
            customer_email: payer?.email_address || 'paypal@customer.com',
            customer_name: payer?.name?.given_name ? `${payer.name.given_name} ${payer.name.surname || ''}` : 'PayPal Customer',
            items: items,
            total_amount: total_amount,
            status: 'Processing',
            scheduled_date: null,
            scheduled_time: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        orders.push(order);
        res.json({ success: true, order });
    } catch (error) {
        console.error('PayPal order error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Track order by order number (public - for customers)
router.get('/orders/track/:orderNumber', (req, res) => {
    const { orderNumber } = req.params;
    const order = orders.find(o => 
        o.order_number?.toLowerCase() === orderNumber.toLowerCase() ||
        o.order_number?.toLowerCase().replace('ord-', '') === orderNumber.toLowerCase().replace('ord-', '')
    );
    
    if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
    }
    
    // Return limited info for public tracking (no email/personal details)
    res.json({ 
        success: true, 
        order: {
            order_number: order.order_number,
            status: order.status,
            items: order.items?.map(item => ({ title: item.title, quantity: item.quantity })),
            created_at: order.created_at,
            scheduled_date: order.scheduled_date,
            scheduled_time: order.scheduled_time
        }
    });
});

// Get order by ID (for success page)
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

// ==================== PRODUCTS API ====================

// Get all products
router.get('/products', (req, res) => {
    res.json(products);
});

// Get single product
router.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// Create product (admin)
router.post('/products', (req, res) => {
    try {
        const { title, description, price, category, image_url, stock } = req.body;
        
        if (!title || !price) {
            return res.status(400).json({ error: 'Title and price are required' });
        }

        const product = {
            id: productIdCounter++,
            title,
            description: description || '',
            price: parseFloat(price),
            category: category || 'Uncategorized',
            image_url: image_url || '',
            stock: parseInt(stock) || 0,
            created_at: new Date().toISOString()
        };

        products.push(product);
        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update product (admin)
router.put('/products/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, category, image_url, stock } = req.body;

        const productIndex = products.findIndex(p => p.id === parseInt(id));
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (title) products[productIndex].title = title;
        if (description !== undefined) products[productIndex].description = description;
        if (price) products[productIndex].price = parseFloat(price);
        if (category) products[productIndex].category = category;
        if (image_url !== undefined) products[productIndex].image_url = image_url;
        if (stock !== undefined) products[productIndex].stock = parseInt(stock);

        res.json({ success: true, product: products[productIndex] });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Delete product (admin)
router.delete('/products/:id', (req, res) => {
    try {
        const { id } = req.params;
        const productIndex = products.findIndex(p => p.id === parseInt(id));
        
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }

        products.splice(productIndex, 1);
        res.json({ success: true });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
