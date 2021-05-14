var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://xuannam:xuannamt81@web.qpw3q.mongodb.net";
//const uri = "mongodb://localhost:27017/";
var client;
MongoClient.connect(uri, function (err, result) {
    if(!err) client = result;
    else console.log('Cannot connect to this database!');
});

// exports.book_create_get = function(req, res, next) {
//     res.render
// }




