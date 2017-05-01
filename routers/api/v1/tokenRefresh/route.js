'use strict';

const express = require('express');
const jwt = require("jsonwebtoken");
const moment = require("moment");
const path = require("path");
const config = require(path.join('..', '..', '..', '..', 'config.js'));
const tokenLib = require(path.join('..', '..', '..', 'auth/token.js'));

const app = express();

module.exports = app;

app.get('/', (req, res, next) => {
    
    if (!req.decodedToken) {
        res.status(400).json({
            error: 'Valid Token is required'
        });
        next();
        return;
    }
    
    tokenLib.getContent(req.decodedToken.username, (err, tokenContent) => {
            
        if (err) {
            console.trace(err);
            res.status(400).send(err);
            return;
        }
        
        // Token Signing
        var token = jwt.sign(tokenContent, config.jwt.secret, config.jwt.options);
        
        // Send Token
        res.status(200).json({
            access_token: token,
            token_type: "bearer",
            expires_in: config.jwt.options.expiresIn || 3600,
            expires_at: moment().add(config.jwt.options.expiresIn || 3600, 'seconds').format('x')
        });
        
    });
    
});
