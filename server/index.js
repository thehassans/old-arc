require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const stripeRoutes = require('./routes/stripe');

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
}));

// Stripe webhook needs raw body - must come before json parser
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// Parse JSON bodies for other routes (increase limit for large payloads)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API routes
app.use('/api/stripe', stripeRoutes);
app.use('/api/support', stripeRoutes); // Support tickets use same router

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', stripe: !!process.env.STRIPE_SECRET_KEY });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// For Passenger
if (typeof(PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
} else {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
