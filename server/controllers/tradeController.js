var mongoose = require('mongoose');
var User = require('../models/user');
var Trader = require('../models/trader').Trader;
var Book = require('../models/book');
var ObjectId = require('mongodb').ObjectId;
var async = require('async');
var moment = require('moment-timezone');

exports.cart = function(req, res, next) {
    async.parallel({
        items: function(callback) {
            Trader.findOne({user_id: req.user_id}).populate('added_items.book_id').populate('ordered_items.book_id').exec(callback);
        },
        user: function(callback) {
            User.findById(req.user_id).exec(callback);
        }
    }, function(err, result) {
        if(err) return res.json(err);
        return res.send({items: result.items, money: result.user.money});
    })
}

exports.add_to_cart = function(req, res, next) {
    var book_list = req.body.book_list;
    book_list.map(function(book) {
        Trader.findOne({user_id: req.user_id, 'added_items.book_id': book.book_id}).exec((err, trader) => {
            if(err) return res.status(400).json(err);
            if(!trader) {
                Trader.updateOne(
                    {user_id: req.user_id},
                    {
                        $addToSet: {
                            'added_items': {
                                'book_id': book.book_id,
                                'quantity': book.quantity,
                                'create_at': new Date(),
                            }
                        }
                    },
                    (err, results) => {}
                )
            }
            else {
                Trader.updateOne(
                    {user_id: req.user_id, 'added_items.book_id': book.book_id},
                    {
                        $inc: {'added_items.$.quantity': book.quantity},
                        $set: {'added_items.$.update_at': new Date()}
                    },
                    (err, results) => {}
                )
            }
        })
    });
    res.json('Complete');
};

exports.remove_from_cart = function(req, res, next) {
    var book_list = req.body.book_list;
    book_list.map(
        function(book) {
            Trader.updateOne(
                {user_id: req.user_id, 'added_items.book_id': book.book_id},
                {
                    $pull: {
                        'added_items': {
                            'book_id': book.book_id
                        }
                    }
                },
                (err, results) => {}
            )
        }
    )
    res.json('Complete');
};

exports.order = function(req, res, next) {
    var book_list = req.body.book_list;
    book_list.map(
        function(book) {
            Trader.updateOne(
                {user_id: req.user_id, 'added_items.book_id': book.book_id},
                {
                    $pull: {
                        'added_items': {
                            'book_id': book.book_id
                        }
                    },
                    $push: {
                        'ordered_items': {
                            'book_id': book.book_id,
                            'quantity': book.quantity,
                            'create_at': new Date(),
                        }
                    }
                },
                (err, results) => {}
            );
            User.findByIdAndUpdate(
                req.user_id, 
                {
                    $inc: {'user.$.money': - req.body.purchase_money}
                }
            )
        }
    )
    res.json('Complete');
}

exports.cancel_order = function(req, res, next) {
    var order_list = req.body.order_list;
    order_list.map(
        function(book) {
            Trader.findOneAndUpdate(
                {user_id: req.user_id},
                {
                    $pull: {
                        'ordered_items': {
                            '_id': new ObjectId(book._id),
                        }
                    }
                },
                (err, trader) => {}
            )
        }
    );
    res.json('Complete');
}