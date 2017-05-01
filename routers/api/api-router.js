'use strict';

const express = require('express');
const app = express();

const v1Route = require(__dirname + '/v1/api-v1-router.js');

app.use('/v1', v1Route);

module.exports = app;
