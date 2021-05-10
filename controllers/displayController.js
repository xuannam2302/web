var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

exports.display_all = function(req, res, next) {
    MongoClient.connect('mongodb://127.0.0.1', function(err, client) {
        if(!err) {
            var db = client.db('web');
            db.collection('book').find({}).collation({ locale: "en" }).sort({'name': 1}).toArray(function(err, results) {
                if(!err) { 
                    res.send(results);
                }
            });
        }
    });
};

exports.display_sort_get = function(req, res, next) {
    res.render('sort_option');
}

exports.display_sort_post = [
    (req, res, next) => {
        MongoClient.connect('mongodb://127.0.0.1', function(err, client) {
            if(!err) {
                var db = client.db('web');
                var sorted_obj = req.body.option;
                if(sorted_obj == 'name') 
                    db.collection('book').find({}).collation({ locale: "en" }).sort({'name': 1}).toArray(function(err, results) {
                        if(!err) { 
                            res.send(results);
                        }
                    });
                if(sorted_obj == 'price') 
                    db.collection('book').find({}).collation({ locale: "en" }).sort({'price': 1}).toArray(function(err, results) {
                        if(!err) { 
                            res.send(results);
                        }
                    });
                if(sorted_obj == 'author') 
                    db.collection('book').find({}).collation({ locale: "en" }).sort({'author': 1}).toArray(function(err, results) {
                        if(!err) { 
                            res.send(results);
                        }
                    });
            }
        });
    }
]

