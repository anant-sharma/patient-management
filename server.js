'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const responseTime = require('response-time');
const config = require(__dirname + '/config.js');

// API Routes
const authRoute = require(__dirname + '/routers/auth/route.js');
const authVerify = require(__dirname + '/routers/auth/verify.js');
const apiRoute = require(__dirname + '/routers/api/api-router.js');

const app = express();

// Parameter Setting
app.set('PORT', process.env.PORT || config.server.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));
app.use(cors());
app.use(responseTime());
app.use('/', express.static(__dirname + '/ui'));
app.use('/bower_components', express.static(__dirname + '/ui/bower_components'));
app.use(authVerify);

// Routes
app.use('/api', apiRoute);
app.use('/auth', authRoute);

// Initialize server
app.listen(app.get('PORT'), (err) => {
    if (err) {
        console.trace(err);
        return;
    }
    console.log(`Server started on port ${app.get('PORT')}`);
});
