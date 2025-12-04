require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - allow all for simplicity
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files FIRST
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// API Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Mock API endpoints (no database required)
app.get('/api/products', (req, res) => {
    res.json([
        { id: 1, title: 'Retro Console X', price: 159.99, image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80' },
        { id: 2, title: 'Classic Controller', price: 34.99, image_url: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80' },
    ]);
});

app.get('/api/admin/stats', (req, res) => {
    res.json({ totalOrders: 124, totalRevenue: 15490.50, totalUsers: 850, totalQueries: 12 });
});

// SPA Fallback - serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
