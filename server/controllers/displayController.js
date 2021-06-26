var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url_link = require('url');
var async = require('async');
var Evaluation = require('../models/evaluation');
var Book = require('../models/book');
//const uri = "mongodb+srv://xuannam:xuannamt81@web.qpw3q.mongodb.net";
const uri = "mongodb://localhost:27017/";
var client;
var limit = 15;

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
            // res.render('index', { books: results });
            res.send({ books: results });
        }
    });
};

exports.search = function (req, res, next) {
    var db = client.db('web');
    var sort = '';
    var lower_price = 0;
    var upper_price = 100000;
    var search_str = '';
    var page = 1;
    var url = url_link.parse(req.url, true);
    if (req.query.sort) sort = req.query.sort;
    if (req.query.lower_price) lower_price = req.query.lower_price;
    if (req.query.upper_price) upper_price = req.query.upper_price;
    if (req.query.search) search_str = req.query.search;
    if (req.query.page) page = req.query.page;
    if (sort == '') {
        db.collection('book').find({
            $and: [
                { $or: [{ "name": { '$regex': search_str, '$options': 'i' } }, { "author": { '$regex': search_str, '$options': 'i' } }] },
                { $and: [{ price: { $gte: Number(lower_price) } }, { price: { $lte: Number(upper_price) } }] }
            ]
        }).collation({ locale: "en" }).sort({ 'last_modified': -1 }).toArray(function (err, results) {
            if (!err) {
                var msg;
                var count = results.length;
                if (results.length == 0) msg = "No book required!";
                else results = results.slice((page - 1) * limit, page * limit);
                res.send({ msg, url, results, count });
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
                var count = results.length;
                if (results.length == 0) msg = "No book required!";
                else results = results.slice((page - 1) * limit, page * limit);
                res.send({ msg, url, results, count });
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
                var count = results.length;
                if (results.length == 0) msg = "No book required!";
                else results = results.slice((page - 1) * limit, page * limit);
                res.send({ msg, url, results, count });
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
                var count = results.length;
                if (results.length == 0) msg = "No book required!";
                else results = results.slice((page - 1) * limit, page * limit);
                res.send({ msg, url, results, count });
            }
        });
    }
}

exports.display_book = async(req, res, next) => {
    var id = new ObjectId(req.params.id);
    var evaluation = await Evaluation.findOne({book_id: id});
    if(!evaluation) {
        evaluation = new Evaluation({
            book_id: id
        });
        await evaluation.save();
    }
    var book = await Book.findById(id);
    evaluation = await Evaluation.findOne({book_id: id}).populate('rating.user_id', 'username evaluations likes')
                                 .populate('comments.user_id', 'username evaluations likes').populate('comments.answers.user_id', 'username')
                                 .populate('comments.likes.user_id', 'username');
    evaluation.comments = evaluation.comments.sort((comment1, comment2) => {return (comment2.create_at - comment1.create_at)})
    res.json({book: book, evaluation: evaluation, user_id: req.user_id});
};
