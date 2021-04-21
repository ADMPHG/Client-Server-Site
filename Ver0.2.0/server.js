const express = require('express');
// const members = require('./memberData');
const logger = require('./middleware/logger');

const app = express();

// Logger middleware
app.use(logger);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set as static folder
app.use(express.static('public'));

// API Routes
app.use('/api/rockets', require('./routes/api/rockets'));

app.use('/api/members', require('./routes/api/members'));

app.use('/api/html', require('./routes/api/tutorialRoutes'));

// Port
app.listen(8090);
