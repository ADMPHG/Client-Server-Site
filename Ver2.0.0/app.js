const express = require('express');
const logger = require('./middleware/logger');

const app = express();

// Logger middleware
app.use(logger);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set as static folder
app.use(express.static('public'));

// API Routes
app.use('/api/rockets', require('./routes/api/rockets'));

app.use('/api/members', require('./routes/api/members'));

// Admin Page
app.use('/api/admin', (req, res) => {
    res.sendFile('./public/admin.html', { root: __dirname });
});

// 404 Page
app.use((req, res) => {
    res.status(404).sendFile('./public/404.html', { root: __dirname });
});

module.exports = app;
