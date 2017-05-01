'use strict';

const alphanumericREGEXP = /^[a-zA-Z0-9\s]+$/;
const multiSpaceREGEXP = /\s{2,}/;
const numericREGEXP = /^[0-9]+$/;

const m = {};
module.exports = m;

/* Required Validation */
m.required = function(x) {
    
    try {
        
        var y;
    
        if (typeof x != 'string') {
            y = x.toString();
        } else {
            y = x;
        }
        
        /* Returns true if expression
        is not null */
        
        if (y.length > 0) {
            return true;
        }
        
        return false;
        
    } catch (e) {
        
        console.trace(e);
        return false;
        
    }
    
};

/* Alphanumeric Validation */
m.alphanumeric = function(x) {
    
    try {
        
        /* Returns true if expression
        is alphanumeric */
        
        if (alphanumericREGEXP.test(x)) {
            return true;
        }
        
        return false;
        
    } catch (e) {
        
        console.trace(e);
        return false;
        
    }
};

/* Multi Space Validation */
m.multispace = function(x) {
    
    try {
        
        /* Returns true if expression
        has multiple spaces in between words */
        
        if (multiSpaceREGEXP.test(x)) {
            return true;
        }
        
        return false;
        
    } catch (e) {
        
        console.trace(e);
        return false;
        
    }
    
};

/* Numeric Validation */
m.numeric = function(x) {
    
    try {
        
        /* Returns true if expression
        has only numeric terms */
        
        if (numericREGEXP.test(x)) {
            return true;
        }
        
        return false;
        
    } catch (e) {
        
        console.trace(e);
        return false;
        
    }
    
};
