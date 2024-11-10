const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes'); // Adjust path if necessary

const session = require('express-session');
const rateLimit = require('express-rate-limit');
const app = express();

// Security Middleware
const clickjackingProtection = (req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY'); // Prevent clickjacking
    next();
};

const sanitizeInput = (input) => {
    return input.replace(/[<>'"]/g, ''); // Remove potential XSS characters
};

const xssProtection = (req, res, next) => {
    for (let field in req.body) {
        req.body[field] = sanitizeInput(req.body[field]);
    }
    next();
};

// Rate limiter to prevent DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100                  // Limit each IP to 100 requests per windowMs
});

// Apply Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);               // Apply DDoS protection
app.use(clickjackingProtection); // Apply clickjacking protection
app.use(xssProtection);          // Apply XSS protection

// Session Jacking Protection
app.use(session({
    secret: 'secureRandomSecret', // Replace with a secure, random value
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict'
    }
}));

// Enforce HTTPS for Man-in-the-Middle Protection
app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// User Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
