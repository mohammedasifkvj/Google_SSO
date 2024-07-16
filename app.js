const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
require('./models/User');
require('./config/passport');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL_LOCAL);

const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cookieParser());
app.use(passport.initialize());

app.use('/', authRoutes);
app.use('/', profileRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
