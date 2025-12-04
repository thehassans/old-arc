require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Database connection (optional - won't crash if fails)
let db;
try {
    db = require('./config/db');
} catch (err) {
    console.error('Database connection error:', err.message);
}

// CORS Configuration
const corsOptions = {
    origin: isProduction 
        ? process.env.CORS_ORIGIN
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', environment: process.env.NODE_ENV });
});

// Import Routes (with error handling)
try {
    const authRoutes = require('./routes/auth');
    const productRoutes = require('./routes/products');
    const orderRoutes = require('./routes/orders');
    const adminRoutes = require('./routes/admin');

    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/admin', adminRoutes);
} catch (err) {
    console.error('Routes loading error:', err.message);
}

// Serve static files in production
if (isProduction) {
    const staticPath = path.join(__dirname, 'public');
    app.use(express.static(staticPath));
    
    // Handle SPA routing - send all non-API requests to index.html
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.join(staticPath, 'index.html'));
        }
    });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: isProduction ? 'Something went wrong!' : err.message 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
