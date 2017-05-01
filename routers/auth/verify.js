'use strict';

const jwt = require("jsonwebtoken");
const path = require("path");
const config = require(path.join('..', '..', 'config.js'));

const m = (req, res, next) => {
    
    // If req.path is not present in paths in config
    if (config.paths.indexOf(req.path) === -1) {
        var token;
        
        try {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                token = req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                token = req.query.token;
            }
            req.token = token;
        } catch (e) {
            console.trace(e);
            return;
        }
        
        jwt.verify(token, config.jwt.secret, config.jwt.options, function(err, decoded) {
            if (err) {
                console.trace(err);
                res.status(401).send({
                    status: "error",
                    error: err
                });
                return;
            }
            
            req.decodedToken = decoded;
            next();
        });
        
    } else {
        next();
    }
};

module.exports = m;
