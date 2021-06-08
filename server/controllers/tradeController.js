var mongoose = require('mongoose');
var User = require('../models/user');
var Trader = require('../models/trader').Trader;
var ObjectId = require('mongodb').ObjectId;

exports.add_to_cart = function(req, res, next) {
    Trader.findOneAndUpdate(
        {user_id: new ObjectId(req.user_id)},
        {$addToSet: {
            'items': {
                'book_id': req.body.book_id,
                'quantity': req.body.quantity,
                'status': 'added_to_cart', 
            }
        }},
        {upsert: true, returnOriginal: false},
    ).exec((err, trader) => {
        if(err) return res.status(400).json({msg: err});
        trader.save((err) => {
            if(err) return res.status(400).json({msg: err});
            res.json({trader: trader})
        });
    })
}