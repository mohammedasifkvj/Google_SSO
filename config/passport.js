const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const keys = require('./keys');

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: 'http://127.0.0.1:5000/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
       // console.log(profile);

        const user = new User({
            googleId: profile.id,
            name:profile.displayName,
            email: profile.emails[0].value // Get email from Google profile
        });

        await user.save();
        done(null, user);
    })
);

// Comment out or remove serializeUser and deserializeUser
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//         done(err, user);
//     });
// });
