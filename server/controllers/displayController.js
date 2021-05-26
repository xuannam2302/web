var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url_link = require('url');
//const uri = "mongodb+srv://xuannam:xuannamt81@web.qpw3q.mongodb.net";
const uri = "mongodb://localhost:27017/";
var client;
MongoClient.connect(uri, function (err, result) {
    if (!err) client = result;
    else console.log('Cannot connect to this database!');
});

exports.display_all = function (req, res, next) {
    var db = client.db('web');
    var url = url_link.parse(req.url, true);
    db.collection('book').find({}).collation({ locale: "en" }).sort({ 'last_modified': -1 }).toArray(function (err, results) {
        if (!err) {
            var msg;
            res.render('index', { books: results });
        }
    });
};

exports.search = function (req, res, next) {
    var db = client.db('web');
    var sort = '';
    var lower_price = 0;
    var upper_price = 100000;
    var search_str = '';
    var url = url_link.parse(req.url, true);
    if (req.query.sort) sort = req.query.sort;
    if (req.query.lower_price) lower_price = req.query.lower_price;
    if (req.query.upper_price) upper_price = req.query.upper_price;
    if (req.query.search) search_str = req.query.search;
    if (sort == '') {
        db.collection('book').find().sort({'last_modified': -1}).toArray(function(err, results) {
            if(!err) {
                var msg;
                if(results.length == 0) msg = "No book required!";
                res.send({msg, url, results});
            }
        })
    }
    else if (sort == 'name') {
        db.collection('book').find({
            $and: [
                { $or: [{ "name": { '$regex': search_str, '$options': 'i' } }, { "author": { '$regex': search_str, '$options': 'i' } }] },
                { $and: [{ price: { $gte: Number(lower_price) } }, { price: { $lte: Number(upper_price) } }] }
            ]
        }).collation({ locale: "en" }).sort({ 'name': 1 }).toArray(function (err, results) {
            if (!err) {
                var msg;
                if(results.length == 0) msg = "No book required!";
                res.send({ msg, url, results });
            }
        });
    }
    else if (sort == 'price') {
        db.collection('book').find({
            $and: [
                { $or: [{ "name": { '$regex': search_str, '$options': 'i' } }, { "author": { '$regex': search_str, '$options': 'i' } }] },
                { $and: [{ price: { $gte: Number(lower_price) } }, { price: { $lte: Number(upper_price) } }] }
            ]
        }).collation({ locale: "en" }).sort({ 'price': 1 }).toArray(function (err, results) {
            if (!err) {
                var msg;
                if(results.length == 0) msg = "No book required!";
                res.send({ msg, url, results });
            }
        });
    }
    else if (sort == 'author') {
        db.collection('book').find({
            $and: [
                { $or: [{ "name": { '$regex': search_str, '$options': 'i' } }, { "author": { '$regex': search_str, '$options': 'i' } }] },
                { $and: [{ price: { $gte: Number(lower_price) } }, { price: { $lte: Number(upper_price) } }, { author: { $ne: null } }] }
            ]
        }).collation({ locale: "en" }).sort({ 'author': 1 }).toArray(function (err, results) {
            if (!err) {
                var msg;
                if(results.length == 0) msg = "No book required!";
                res.send({ msg, url, results });
            }
        });
    }
}

exports.display_book = function (req, res, next) {
    var db = client.db('web');
    var id = new ObjectId(req.params.id);
    db.collection('book').find({ _id: id }).toArray(function (err, results) {
        res.send(results[0]);
    });
};
