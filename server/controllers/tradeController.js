var User = require('../models/user');
var Trader = require('../models/trader').Trader;
var Book = require('../models/book');
var ObjectId = require('mongodb').ObjectId;
var async = require('async');

exports.cart = function(req, res, next) {
    async.parallel({
        items: function(callback) {
            Trader.findOne({user_id: req.user_id}).populate('added_items.book_id').populate('ordered_items.book_id').exec(callback);
        },
        user: function(callback) {
            User.findById(req.user_id).exec(callback);
        },
    }, function(err, result) {
        if(err) return res.json(err);
        return res.send({items: result.items.added_items, money: result.user.money});
    })   
}

exports.order_list = function(req, res, next) {
    async.parallel({
        items: function(callback) {
            Trader.findOne({user_id: req.user_id}).populate('added_items.book_id').populate('ordered_items.book_id').exec(callback);
        },
        user: function(callback) {
            User.findById(req.user_id).exec(callback);
        },
    }, function(err, result) {
        if(err) return res.json(err);
        return res.send({items: result.items.ordered_items, money: result.user.money});
    })   
}

exports.deliver_list = function(req, res, next) {
    async.parallel({
        items: function(callback) {
            Trader.findOne({user_id: req.user_id}).populate('added_items.book_id').populate('ordered_items.book_id').exec(callback);
        },
        user: function(callback) {
            User.findById(req.user_id).exec(callback);
        },
    }, function(err, result) {
        if(err) return res.json(err);
        return res.send({items: result.items.delivered_items, money: result.user.money});
    })   
}

exports.quantity = async(req, res, next) => {
    var trader = await Trader.aggregate([
        {$match: {user_id: new ObjectId(req.user_id)}},
        {$unwind: '$added_items'},
        {
            $group: {
                _id: null,
                count: {$sum: '$added_items.quantity'}
            }
        }        
    ])
    if(trader[0].count) return res.json({quantity: trader[0].count})
    else return res.json({quantity: 0});
}

exports.add_to_cart = async(req, res, next) => {
    var book_list = req.body.book_list;
    await Promise.all(
        book_list.map(
            async(book) => {
                var trader = await Trader.findOne({user_id: req.user_id, 'added_items.book_id': book.book_id});
                if(!trader) {
                    await Trader.updateOne(
                        {user_id: req.user_id},
                        {
                            $addToSet: {
                                'added_items': {
                                    'book_id': book.book_id,
                                    'quantity': book.quantity,
                                    'create_at': new Date(),
                                }
                            }
                        }
                    )
                }
                else {
                    await Trader.updateOne(
                        {user_id: req.user_id, 'added_items.book_id': book.book_id},
                        {
                            $inc: {'added_items.$.quantity': book.quantity},
                            $set: {'added_items.$.update_at': new Date()}
                        },
                    )
                }
            }
        )
    );
    next();
};

exports.remove_from_cart = async(req, res, next) => {
    var book_list = req.body.book_list;
    await Promise.all(
        book_list.map(
            async(book) => {
                await Trader.updateOne(
                    {user_id: req.user_id, 'added_items.book_id': book.book_id},
                    {
                        $pull: {
                            'added_items': {
                                'book_id': book.book_id
                            }
                        }
                    },
                )
            }
        )
    )
    next();
};

exports.order = async(req, res, next) => {
    var book_list = req.body.book_list;
    await Promise.all(
        book_list.map(
            async(book) => {
                await Trader.updateOne(
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
            }
        )
    );
    next();
}

exports.cancel_order = async(req, res, next) => {
    var order_list = req.body.order_list;
    await Promise.all(
        order_list.map(
            async(book) => {
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
        )
    )
    res.json('Complete');
}

exports.deliver = async(req, res, next) => {
    var deliver_list = req.body.deliver_list;
    await Promise.all(
        deliver_list.map(
            async(book) => {
                var modified = await Trader.updateOne(
                    {user_id: req.user_id, 'ordered_items._id': new ObjectId(book._id)},
                    {
                        $pull: {
                            'ordered_items': {
                                '_id': new ObjectId(book._id),
                            }
                        },
                        $push: {
                            'delivered_items': {
                                $each: [{'book_id': book.book_id, 'quantity': book.quantity, 'create_at': new Date()}],
                                $sort: {'create_at': -1},
                                $slice: 50
                            }
                        },
                    },
                );
                if(modified.nModified > 0) {
                    await User.findByIdAndUpdate(
                        req.user_id,
                        {
                            $inc: {
                                'money': - book.purchase_money
                            }
                        },
                    );
                }
            }
            
        )
    );
    next();
} 
