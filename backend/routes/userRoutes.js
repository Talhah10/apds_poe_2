const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Use Helmet middleware for setting various HTTP headers
router.use(helmet());

// Apply rate limiting to all routes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
router.use(limiter);

// Input validation middleware
const validateInput = (method) => {
    switch (method) {
        case 'register': {
            return [
                body('username')
                    .matches(/^[a-zA-Z0-9_]{3,20}$/)
                    .withMessage('Username must be 3-20 characters long and can only contain letters, numbers, and underscores'),
                body('password')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                    .withMessage('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character'),
                body('email')
                    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                    .withMessage('Invalid email format'),
                // Optional: add phone number validation if required
                body('phone')
                    .optional()
                    .matches(/^[0-9]{10}$/)
                    .withMessage('Invalid phone number format')
            ];
        }
        case 'login': {
            return [
                body('username')
                    .matches(/^[a-zA-Z0-9_]{3,20}$/)
                    .withMessage('Invalid username format'),
                body('password')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                    .withMessage('Invalid password format')
            ];
        }
    }
}

// User Registration Route
router.post('/register', validateInput('register'), async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array().reduce((acc, error) => {
                    acc[error.param] = error.msg;
                    return acc;
                }, {})
            });
        }

        const { username, password, email, phone } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ 
                errors: { 
                    general: 'User with this username or email already exists'
                }
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const user = new User({ username, password: hashedPassword, email, phone });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            errors: { 
                general: 'An error occurred during registration'
            }
        });
    }
});

// User Login Route
router.post('/login', validateInput('login'), async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array().reduce((acc, error) => {
                    acc[error.param] = error.msg;
                    return acc;
                }, {})
            });
        }

        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ 
                errors: { 
                    general: 'Invalid credentials'
                }
            });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                errors: { 
                    general: 'Invalid credentials'
                }
            });
        }

        // Create and sign the JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            errors: { 
                general: 'An error occurred during login'
            }
        });
    }
});

// Export the router
module.exports = router;
