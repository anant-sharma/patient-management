'use strict';

const path = require("path");
const validationUtils = require(path.join('..', '..', '..', '..', 'utils/validation.js'));

module.exports = (data, cb) => {
    
    var outObj = {
        errors: []
    };
    
    // First Name
    if (!validationUtils.required(data.firstname)) {
        outObj.errors.push("First Name : This field is mandatory");
    }
    
    // Last Name
    if (!validationUtils.required(data.lastname)) {
        outObj.errors.push("Last Name : This field is mandatory");
    }
    
    // Age
    if (!validationUtils.required(data.age)) {
        outObj.errors.push("Age : This field is mandatory");
    }
    if (!validationUtils.required(data.age)) {
        outObj.errors.push("Age : Only numeric values are allowed");
    }
    
    // Gender
    if (['Male', 'Female'].indexOf(data.gender) === -1) {
        outObj.errors.push("Gender : Allowed values are Male and Female");
    }
    
    /* Validation Complete */
    cb(null, outObj);
    
};
