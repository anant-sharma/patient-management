'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://admin:admin@ds123351.mlab.com:23351/patient-management';

var db;
MongoClient.connect(url, (err, database) => {
    if (err) {
        console.trace(err);
        return;
    }
    
    console.log("Connected successfully to mongodb server");
    
    db = database;
});

var m = {};
module.exports = m;

m.info = (data, projection, cb) => {
    
    var collection = db.collection('patients');
    
    collection.find(data, projection).toArray(cb);
};

m.register = (query, data, cb) => {
    
    var collection = db.collection('patients');
    
    collection.update(query, data, { upsert: true }, (err, result) => {
        
        if (err) {
            console.trace(err);
            cb(err);
            return;
        }
        
        cb(null, {
            status: "success",
            msg: "Created successfully"
        });
    });
};
