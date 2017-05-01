'use strict';

var alphanumericREGEXP = /^[a-zA-Z0-9\s]+$/;
var multiSpaceREGEXP = /\s{2,}/;
var numericREGEXP = /^[0-9]+$/;

app.service('validationService', function() {
    var self = this;
    
    /* Required Validation */
    this.required = function(x) {
        
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
        
    };
    
    /* Alphanumeric Validation */
    this.alphanumeric = function(x) {
        
        /* Returns true if expression
        is alphanumeric */
        
        if (alphanumericREGEXP.test(x)) {
            return true;
        }
        
        return false;
    };
    
    /* Multi Space Validation */
    this.multispace = function(x) {
        
        /* Returns true if expression
        has multiple spaces in between words */
        
        if (multiSpaceREGEXP.test(x)) {
            return true;
        }
        
        return false;
        
    };
    
    /* Numeric Validation */
    this.numeric = function(x) {
        
        /* Returns true if expression
        has only numeric terms */
        
        if (numericREGEXP.test(x)) {
            return true;
        }
        
        return false;
        
    };
    
});
