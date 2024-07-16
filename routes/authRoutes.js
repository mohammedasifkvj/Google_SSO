const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();



router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false // Disable session
}));

router.get('/google/callback', passport.authenticate('google', { session: false,failureRedirect:'/' }), authController.googleAuth);
router.get('/logout', authController.logout);

module.exports = router;
