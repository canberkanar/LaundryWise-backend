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
const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: false}));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'Welcome to LaundryWise'
    });
});

// API routes
api.use('/auth', auth);
api.use('/movies', movie);
api.use('/laundryroom', laundryRoom)
api.use('/machine', machine)
api.use('/feedback',feedback)
module.exports = api;