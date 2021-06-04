var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const { body,validationResult } = require('express-validator');


//const uri = "mongodb+srv://xuannam:xuannamt81@web.qpw3q.mongodb.net";
const uri = "mongodb://localhost:27017/";
var client;
MongoClient.connect(uri, function (err, result) {
    if(!err) client = result;
    else console.log('Cannot connect to this database!');
});

exports.book_manage = function(req, res, next) {
    db.collection('book').find().sort({'last_modified': -1}).toArray(function(err, results) {
        if(!err) {
            var msg;
            if(results.length == 0) msg = "No book required!";
            res.send({msg, url, results});
        }
    })
}

exports.book_create_post = [
    body('name', 'Name empty').trim().isLength({min: 1}).escape(),
    body('author', 'Author empty').trim().isLength({min:1}).escape(),
    body('price', 'Price is less than 0').isFloat({min: 0}).escape(),
    body('isbn', 'ISBN empty').trim().isLength({min: 1}).escape(),
    function(req, res, next)  {
        console.log(req.body);
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.render('book_form',{book: req.body, errors: errors.array()});
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
]

exports.book_update_post = [
    body('name', 'Name empty').trim().isLength({min: 1}).escape(),
    body('author', 'Author empty').trim().isLength({min:1}).escape(),
    body('price', 'Price is less than 0').isFloat({min: 0}).escape(),
    body('isbn', 'ISBN empty').trim().isLength({min: 1}).escape(),
    (req, res, next) => {
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
]

exports.book_delete_post = function(req, res, next) {
    var db = client.db('web');
    var id = new ObjectId(req.params.id);
    db.collection('book').remove({_id: id}, function(err, results) {
        res.send({msg: 'Object deleted'});
    })
}