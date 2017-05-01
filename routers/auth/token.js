'use strict';

const m = {};

m.getContent = (user, cb) => {
    
    // Specify what needs to be in token content
    var tokenContent = {
        username: user
    };
    
    cb(null, tokenContent);
    
};

module.exports = m;
