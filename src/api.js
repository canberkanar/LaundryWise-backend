"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const middlewares = require('./middlewares');

const auth = require('./routes/auth');
const movie = require('./routes/movie');
const laundryRoom = require('./routes/laundryroom')
const machine = require('./routes/machine')
const feedback = require('./routes/feedback')
const rental = require('./routes/rental')
const announcement = require('./routes/announcement')
const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: false}));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'Welcome to LaundryWise backend service!'
    });
});

// API routes
api.use('/auth', auth);
api.use('/movies', movie);
api.use('/laundryroom', laundryRoom)
api.use('/machine', machine)
api.use('/feedback',feedback)
api.use('/rental', rental)
api.use('/announcement', announcement)
module.exports = api;