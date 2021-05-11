var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://xuannam:xuannamt81@web.qpw3q.mongodb.net";
const uri_backup = "mongodb://localhost:27017/";
var client;
MongoClient.connect(uri, function (err, result) {
    if(!err) client = result;
    else console.log('Cannot connect to this database!');
});

exports.display_all = function(req, res, next) {
    var db = client.db('web');
    db.collection('book').find({}).collation({ locale: "en" }).sort({'name': 1}).toArray(function(err, results) {
        if(!err) { 
            res.send(results);
        }
    });
};

exports.display_sort_get = function(req, res, next) {
    res.render('sort_option');
}

exports.display_sort_post = [
    (req, res, next) => {
        var db = client.db('web');
        var sorted_obj = req.body.option;
        if(sorted_obj == 'name') 
            db.collection('book').find({}).collation({ locale: "en" }).sort({'name': 1}).toArray(function(err, results) {
                if(!err) { 
                    res.send(results);
                }
            });
        if(sorted_obj == 'price') 
            db.collection('book').find({price:{$gt:0}}).collation({ locale: "en" }).sort({'price': 1}).toArray(function(err, results) {
                if(!err) { 
                    res.send(results);
                }
            });
        if(sorted_obj == 'author') 
            db.collection('book').find({author:{$ne:null}}).collation({ locale: "en" }).sort({'author': 1}).toArray(function(err, results) {
                if(!err) { 
                    res.send(results);
                }
            });
    }
]

exports.filter_price_get = function(req, res, next) {
    res.render('filter_price');
}

exports.filter_price_post = function(req, res, next) {
    var db = client.db('web');
    var lower_price = req.body.lower_price;
    var upper_price = req.body.upper_price;
    db.collection('book').find({price: {$gte: Number(lower_price), $lte: Number(upper_price)}}).collation({ locale: "en" }).sort({'price': 1}).toArray(function(err, results) {
        if(!err) { 
            res.send(results);
        }
    });
}

