'use strict';

const express = require('express');
const jwt = require("jsonwebtoken");
const moment = require("moment");
const path = require("path");
const config = require(path.join('..', '..', 'config.js'));
const tokenLib = require(__dirname + '/token.js');

const app = express();

module.exports = app;

app.post('/', (req, res, next) => {
    
    if (!req.body.username) {
        res.status(400).json({ error: 'Username is required' });
        next();
        return;
    }
    if (!req.body.password) {
        res.status(400).json({ error: 'Password is required' });
        next();
        return;
    }
    
    if (!(req.body.username === 'dataphi' && req.body.password === 'dataphi')) {
        
        res.status(401).json({
            'error': 'Invalid credentials'
        });
        return;
        
    }
    
    tokenLib.getContent(req.body.username, (err, tokenContent) => {
            
        if (err) {
            console.trace(err);
            res.status(400).send(err);
            return;
        }
        
        /**
         * Sign token with the secret
         * anf options defined in config file
         */
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
