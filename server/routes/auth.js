const express = require('express');
const { signup, signin, googleAuth } = require('../controllers/auth');

const router = express.Router();

// Create a User
router.post('/signup', signup)

// Sign In
router.post('/signin', signin )

// Goolgle Auth
router.post('/google', googleAuth)

module.exports = router;