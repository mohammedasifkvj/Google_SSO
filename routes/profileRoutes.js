const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/profile', authMiddleware, (req, res) => {
    res.render('profile', { user: req.user });
});

router.get('/google/callback', authMiddleware, (req, res) => {
    res.render('profile', { user: req.user });
});

module.exports = router;