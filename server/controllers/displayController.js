var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
//const uri = "mongodb+srv://xuannam:xuannamt81@web.qpw3q.mongodb.net";
const uri = "mongodb://localhost:27017/";
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

exports.display_sort_post = function(req, res, next) {
        var db = client.db('web');
        var sorted_obj = req.body.value;
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


exports.filter_price_get = function(req, res, next) {
    res.render('filter_price');
}

exports.filter_price_post = function(req, res, next) {
    var db = client.db('web');
    var lower_price = req.body.lower_price;
    if(!lower_price) lower_price = 0;
    var upper_price = req.body.upper_price;
    if(upper_price) {
        db.collection('book').find({price: {$gte: Number(lower_price), $lte: Number(upper_price)}}).collation({ locale: "en" }).sort({'price': 1}).toArray(function(err, results) {
            if(!err) { 
                res.send(results);
            }
        });
    }
    else {
        db.collection('book').find({price: {$gte: Number(lower_price)}}).collation({ locale: "en" }).sort({'price': 1}).toArray(function(err, results) {
            if(!err) { 
                res.send(results);
            }
        });
    }
}

exports.search_get = function(req, res, next) {
    res.render('search');
}

exports.search_post = function(req, res, next) {
    var db = client.db('web');
    var search_str = req.body.value;
    db.collection('book').find({$or:[{"name":{ '$regex' : search_str, '$options' : 'i' }}, {"author":{ '$regex' : search_str, '$options' : 'i' }}]})
      .collation({ locale: "en" }).sort({'name': 1}).toArray(function(err, results) {
        if(!err) { 
            res.send(results);
        }
    });
}

exports.display_book = function(req, res, next) {
    var db = client.db('web');
    var id = new ObjectId(req.params.id);
    db.collection('book').find({_id: id}).toArray(function(err, results) {
        res.send(results);
    });
}