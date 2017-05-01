'use strict';

const express = require('express');
const app = express();

module.exports = app;

// Routes
const tokenRefreshRoute = require(__dirname + '/tokenRefresh/route.js');
const patientRoute = require(__dirname + '/patient/route.js');

// Routes Assignment
app.use('/refresh', tokenRefreshRoute);
app.use('/patient', patientRoute);
