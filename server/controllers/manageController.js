var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const { body,validationResult } = require('express-validator');
var async = require('async');

//const uri = "mongodb+srv://xuannam:xuannamt81@web.qpw3q.mongodb.net";
const uri = "mongodb://localhost:27017/";
var client;
MongoClient.connect(uri, function (err, result) {
    if(!err) client = result;
    else console.log('Cannot connect to this database!');
});

exports.book_create_get = function(req, res, next) {
    res.render('book_form');
    
    // var db = client.db('web');
    // db.collection('book').insert({name: "abc", price: "12", author: "author"});
    // res.send('Successful');
}

exports.book_create_post = [
    // body('name').trim().isLength({min: 1}),
    // body('author').trim().isLength({min: 1}),
    // body('price').trim().isLength({min: 1}).isFloat({min: 0}),
    // body('isbn').trim().isLength({min: 1}),
    (req, res, next) => {
        var db = client.db('web');
        var exist = 0;
        db.collection('book').find({isbn: req.body.isbn}).collation({ locale: "en" }).toArray(function (err, results) {
            if (!err) {
                if(results.length > 0) {
                    exist = 1;
                    res.send({results, exist});
                }
            }
        });
        console.log(req.body);
        db.collection('book').insert({author: req.body.author, book_depository_stars: req.body.book_depository_stars, 
                                        category: req.body.category, currency: req.body.currency, format: req.body.format, 
                                        image: req.body.image, img_paths: req.body.img_paths, isbn: req.body.isbn, name: req.body.name, 
                                        old_price: req.body.old_price, price: req.body.price});
        // db.collection('book').insert({author: req.body.author, name: req.body.name, price: req.body.price, isbn: req.body.isbn});
        db.collection('book').find({isbn: req.body.isbn}).collation({ locale: "en" }).toArray(function (err, results) {
            if (!err) {
                    res.send({results, exist});
                
            }
        });
    }
]



