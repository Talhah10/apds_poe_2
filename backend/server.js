const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// User routes
const userRoutes = require('./routes/userRoutes'); // Adjust path if necessary

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Apply rate limiting to all routes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Input validation middleware
const validateInput = (method) => {
    switch (method) {
        case 'register': {
            return [
                body('username')
                    .matches(/^[a-zA-Z0-9_]{3,20}$/)
                    .withMessage('Username must be 3-20 characters long and can only contain letters, numbers, and underscores'),
                body('password')
                    .isLength({ min: 8 })
                    .withMessage('Password must be at least 8 characters long'),
                body('email')
                    .isEmail()
                    .withMessage('Invalid email format')
            ]
        }
        case 'login': {
            return [
                body('username')
                    .matches(/^[a-zA-Z0-9_]{3,20}$/)
                    .withMessage('Invalid username format'),
                body('password')
                    .isLength({ min: 8 })
                    .withMessage('Invalid password')
            ]
        }
    }
}

// User Registration Route
app.post('/register', validateInput('register'), async (req, res) => {
    // Registration logic here...
});

// User Login Route
app.post('/login', validateInput('login'), async (req, res) => {
    // Login logic here...
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define a simple route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Use the user routes
app.use('/api/users', userRoutes);

// Ensure HTTPS traffic by redirecting HTTP to HTTPS (only for production)
app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
});

// Load SSL certificate files
const privateKey = fs.readFileSync(path.join(__dirname, 'certificates', 'privkey.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem'), 'utf8');
const ca = fs.readFileSync(path.join(__dirname, 'certificates', 'chain.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

// Run the server on port 443 (HTTPS)
const PORT = process.env.PORT || 443;
httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
});

// Use the user routes
app.use('/api/users', userRoutes);

// Export app for testing
module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
