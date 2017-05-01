'use strict';

const express = require('express');
const path = require("path");

// Patient Module
const patient = require(path.join(__dirname, 'module.js'));
const patientValidation = require(path.join(__dirname, 'validation.js'));

const app = express();

module.exports = app;

app.get('/', (req, res, next) => {
    
    patient.list((e, response) => {
        
        if (e) {
            console.trace(e);
            res.status(400).send(e);
            return;
        }
        
        res.status(200).send(response);
    });
    
});

app.post('/', (req, res, next) => {
    
    patient.detail(req.body.id, (e, response) => {
        
        if (e) {
            console.trace(e);
            res.status(400).send(e);
            return;
        }
        
        res.status(200).send(response);
    });
    
});

app.put('/', (req, res, next) => {
    try {
        
        var data = req.body;
        
        /* Validate Input Data */
        patientValidation(data, (err, response) => {
            
            if (err) {
                console.trace(err);
                res.status(400).send(err);
                return;
            }
            
            if (response.errors.length > 0) {
                // Validation Failed
                res.status(400).send(response);
                return;
            }
            
            /* Insert record */
            patient.insert(data, (e, response) => {
                if (e) {
                    console.trace(e);
                    res.status(400).send(e);
                    return;
                }
                
                res.status(200).send(response);
            });
            
        });
        
    } catch (e) {
        console.trace(e);
        res.status(400).json({
            "error": "Processing Error"
        });
        next();
    }
});
