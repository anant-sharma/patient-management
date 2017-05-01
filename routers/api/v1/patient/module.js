'use strict';

const path = require('path');
const ObjectId = require('mongodb').ObjectId;
const moment = require("moment");
const db = require(path.join('..', '..', '..', '..', 'utils/db.js'));

const m = {};
module.exports = m;

m.list = (cb) => {
    
    var filter = {};
    
    var projection = {};
    
    /* Make db request */    
    db.info(filter, projection, cb);
    
};

m.detail = (id, cb) => {
    
    var filter = {
        "_id": ObjectId(id)
    };
    
    var projection = {};
    
    /* Make db request */    
    db.info(filter, projection, cb);
    
};

m.insert = (data, cb) => {
    
    var query = {};
    
    if (data.hasOwnProperty('_id')) {
        query._id = ObjectId(data._id);
    } else {
        query.ts = moment().format('x');
    }
    
    delete data._id;
    
    /* Make db request */    
    db.register(query, data, cb);
    
};
