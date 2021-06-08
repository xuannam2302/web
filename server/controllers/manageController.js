var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const { body, validationResult } = require('express-validator');


//const uri = "mongodb+srv://xuannam:xuannamt81@web.qpw3q.mongodb.net";
const uri = "mongodb://localhost:27017/";
var client;
MongoClient.connect(uri, function (err, result) {
    if (!err) client = result;
    else console.log('Cannot connect to this database!');
});

exports.book_manage = function (req, res, next) {
    db = client.db('web');
    db.collection('book').find().sort({ 'last_modified': -1 }).toArray(function (err, results) {
        if (!err) {
            res.send({ results });
        }
    });
};

exports.book_create_post = function(req, res, next)  {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.send({results: req.body, errors: errors.array()});
        return;
    } 
    else {
        var db = client.db('web');
        var msg;
        db.collection('book').find({isbn: req.body.isbn}).toArray(function(err, results) {
            if(!err) {
                if(results.length == 0) { 
                    msg = 'successful created';
                    db.collection('book').insertOne({author: req.body.author, book_depository_stars: Number(req.body.book_depository_stars), 
                        category: req.body.category, currency: req.body.currency, format: req.body.format, 
                        image: req.body.image, img_paths: req.body.img_paths, isbn: req.body.isbn, name: req.body.name, 
                        old_price: Number(req.body.old_price), price: Number(req.body.price), last_modified: new Date().toTimeString()});
                    db.collection('book').find({isbn: req.body.isbn}).collation({ locale: "en" }).toArray(function (err, results) {
                        if (!err) {
                            
                            res.send({results, msg});
                        }
                    });
                }
                else {
                    msg = 'exist';
                    res.send({results, msg});
                }
            }
        });
    }
}


exports.book_update_post = (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.send({book: req.body, errors: errors.array()});
    } 
    else {
        var db = client.db('web');
        var id = new ObjectId(req.params.id);  
        db.collection('book').find({isbn: req.body.isbn}).toArray(function(err, results) {
            if(!err) {
                if(results.length > 1) 
                    res.send({book: req.body, errors: "Exist isbn"});
                else {
                    db.collection('book').updateOne(
                        {_id: id},
                        {
                            $set: {
                                author: req.body.author, book_depository_stars: Number(req.body.book_depository_stars), 
                                    category: req.body.category, currency: req.body.currency, format: req.body.format, 
                                    image: req.body.image, img_paths: req.body.img_paths, isbn: req.body.isbn, name: req.body.name, 
                                    old_price: Number(req.body.old_price), price: Number(req.body.price), last_modified: new Date().toTimeString()
                            }
                        }, function(err, results) {
                            if(!err) {
                                db.collection('book').find({_id: id}).toArray(function(err, results) {
                                    res.send(results);
                                });  
                            }
                        }
                    ); 
                }
            }
        })        
    }
}

exports.book_delete_post = function (req, res, next) {
    var db = client.db('web');
    var id = new ObjectId(req.params.id);
    db.collection('book').remove({ _id: id }, function (err, results) {
        res.send({ msg: 'Object deleted' });
    })
}