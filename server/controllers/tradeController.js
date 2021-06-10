var mongoose = require('mongoose');
var User = require('../models/user');
var Trader = require('../models/trader').Trader;
var ObjectId = require('mongodb').ObjectId;
var async = require('async');

exports.add_to_cart = function(req, res, next) {
    Trader.findOne({user_id: req.user_id}).exec((err, user) => {
        if(err) return res.status(400).json(err);
        if(!user) {
            Trader.insertMany([
                {
                    'user_id': req.user_id,
                    'items': {
                        'book_id': req.body.book_id,
                        'quantity': req.body.quantity,
                        'status': 'added_to_cart',
                    }
                }
            ]);
        }
        else {
            Trader.findOne({user_id: req.user_id, 'items.book_id': req.body.book_id}).exec((err, trader) => {
                if(err) return res.status(400).json(err);
                if(!trader) {
                    Trader.updateOne(
                        {user_id: req.user_id},
                        {
                            $addToSet: {
                                'items': {
                                    'book_id': req.body.book_id,
                                    'quantity': req.body.quantity,
                                    'status': 'added_to_cart',
                                }
                            }
                        },
                        (err, results) => {}
                    )
                }
                else {
                    Trader.updateOne(
                        {user_id: req.user_id, 'items.book_id': req.body.book_id},
                        {
                            $inc: {'items.$.quantity': req.body.quantity}
                        },
                        (err, results) => {}
                    )
                }
            })
        }
        res.json('Complete');
    })
}