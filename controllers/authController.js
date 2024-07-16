const jwt = require('jsonwebtoken')
const User = require('../models/User');

const googleAuth = async (req, res) => {
    try{
    // Get the user object from req.user
    const user = req.user;

    // Generate JWT token
    const token = jwt.sign(
        {id:user._id}, // Use user.id if you have an id field
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    const options = {
       // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // 7 days expiry
        httpOnly: true, // Cookie can only be manipulated by the browser
        secure: true // Cookie will be sent only over HTTPS
    };

    // Send token in user cookie
    res.cookie('jwt', token, options);
    return res.redirect('/profile');
     }catch (e) {
        console.log(e.message);
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.redirect('/');
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = { googleAuth,
                   logout };


