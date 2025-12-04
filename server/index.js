const express = require('express');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// For Passenger
if (typeof(PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
} else {
    app.listen(process.env.PORT || 3000)
}
