var User = require('../models/user');
var Trader = require('../models/trader').Trader;
var Book = require('../models/book');
var Evaluation = require('../models/evaluation');
var ObjectId = require('mongodb').ObjectId;
var async = require('async');

exports.post_comment = async(req, res, next) => {
    var id = new ObjectId(req.params.id);
    var comment = req.body.comment;
    var rating_stars = req.body.rating_stars;
    var comment_id = req.body.comment_id;
    if(!comment_id) {
        var evaluation = await Evaluation.findOne({book_id: id, 'comments.user_id': req.user_id});
        if(!evaluation) {
            await Evaluation.findOneAndUpdate(
                {book_id: id},
                {
                    $push: {
                        'comments': {
                            $each: [{user_id: req.user_id, content: comment, rating: rating_stars, create_at: new Date(),}],
                            $sort: {'create_at': -1}
                        }
                    }
                }
            );
        }
        else {
            await Evaluation.findOneAndUpdate(
                {book_id: id, 'comments.user_id': req.user_id},
                {
                    $pull: {
                        'comments': {
                            'user_id': req.user_id
                        }
                    },
                }
            )
            console.log('here');
            await Evaluation.findOneAndUpdate(
                {book_id: id},
                {
                    $push: {
                        'comments': {
                            $each: [{user_id: req.user_id, content: comment, rating: rating_stars, create_at: new Date(),}],
                            $sort: {'create_at': -1}
                        }
                    }
                }
            );
        }
    }
    else {
        await Evaluation.findOneAndUpdate(
            {book_id: id, 'comments._id': new ObjectId(comment_id)},
            {
                $set: {
                    'comments.$.content': comment,
                    'comments.$.rating': rating_stars,
                }
            }
        )
    }
    next();
}

exports.delete_comment = async(req, res, next) => {
    var id = new ObjectId(req.params.id);
    var comment_id = req.body.comment_id;
    await Evaluation.findOneAndUpdate(
        {book_id: id, 'comments._id': new ObjectId(comment_id)},
        {
            $pull: {
                'comments': {
                    '_id': new ObjectId(comment_id)
                }
            }
        }
    )
    next();
}

exports.post_answer = async(req, res, next) => {
    var id = new ObjectId(req.params.id);
    var comment_id = req.params.comment_id;
    var answer = req.body.answer;
    await Evaluation.findOneAndUpdate(
        {book_id: id, 'comments._id': new ObjectId(comment_id)},
        {
            $push: {
                'comments.$.answers': {
                    $each: [{'user_id': req.user_id, 'content': answer, create_at: new Date(),}],
                    $sort: {'create_at': -1}
                }
            }
        }
    )
    return res.json('Complete')
}

exports.delete_answer = async(req, res, next) => {
    var id = new ObjectId(req.params.id);
    var comment_id = req.params.comment_id;
    var answer_id = req.body.answer_id;
    await Evaluation.findOneAndUpdate(
        {book_id: id, 'comments.answers._id': new ObjectId(answer_id), 'comments._id': new ObjectId(comment_id)},
        {
            $pull: {
                'comments.$.answers': {
                    '_id': new ObjectId(answer_id)
                }
            }
        }
    )
    return res.json('Complete')
}

exports.like = async(req, res, next) => {
    var id = new ObjectId(req.params.id);
    var comment_id = new ObjectId(req.params.comment_id);
    var comment = await Evaluation.aggregate([
        {$match: {'comments._id': comment_id}},
        {
            $project: {
                _id: null,
                'info': {
                    $filter: {
                        'input': '$comments',
                        'as': 'comment',
                        'cond': {$eq: ['$$comment._id', comment_id]}
                    }
                }
            }
        }
    ])
    req.creator_id = comment[0].info[0].user_id;
    if(req.creator_id == req.user_id) {
        return res.json({msg: 'You cannot like/unlike the evaluation you created'})
    }
    await Evaluation.findOneAndUpdate(
        {book_id: id, 'comments._id': new ObjectId(comment_id)},
        {
            $addToSet: {
                'comments.$.likes': {
                    'user_id': req.user_id
                }
            }
        }
    )
    next();
}

exports.unlike = async(req, res, next) => {
    var id = new ObjectId(req.params.id);
    var comment_id = new ObjectId(req.params.comment_id);
    var comment = await Evaluation.aggregate([
        {$match: {'comments._id': comment_id}},
        {
            $project: {
                _id: null,
                'info': {
                    $filter: {
                        'input': '$comments',
                        'as': 'comment',
                        'cond': {$eq: ['$$comment._id', comment_id]}
                    }
                }
            }
        }
    ])
    req.creator_id = comment[0].info[0].user_id;
    if(req.creator_id == req.user_id) {
        return res.json({msg: 'You cannot like/unlike the evaluation you created'})
    }
    await Evaluation.findOneAndUpdate(
        {book_id: id, 'comments._id': new ObjectId(comment_id), 'comments.likes.user_id': req.user_id},
        {
            $pull: {
                'comments.$.likes': {
                    'user_id': req.user_id
                }
            }
        }
    )
    next();
}

exports.update_rating = async(req, res, next) => {
    var id = new ObjectId(req.params.id);
    var rating = await Evaluation.aggregate([
        {$match: {book_id: id}},
        {$unwind: '$comments'},
        {
            $group: {
                _id: null,
                average: {$avg: '$comments.rating'}
            }
        }
    ]);
    await Book.findByIdAndUpdate(
        id, 
        {
            $set: {
                'book_depository_stars': rating[0].average
            }
        }
    )
    res.json('Complete');
}

exports.update_evaluations = async(req, res, next) => {
    var evaluations = await Evaluation.aggregate([
        {$match: {'comments.user_id': new ObjectId(req.user_id)}},
        {
            $count: 'total'
        }
    ]);
    if(evaluations[0]) {
        await User.findByIdAndUpdate(
            req.user_id,
            {
                $set: {
                    'evaluations': evaluations[0].total
                }
            }
        );
    }
    else {
        await User.findByIdAndUpdate(
            req.user_id,
            {
                $set: {
                    'evaluations': 0
                }
            }
        );
    }
    next();
}

exports.update_likes = async(req, res, next) => {
    var evaluations = await Evaluation.aggregate([
        {$match: {'comments.user_id': new ObjectId(req.creator_id)}},
        {
            $project: {
                _id: null,
                'comments': {
                    $map: {
                        'input': {
                            $filter: {
                                'input': '$comments',
                                'as': 'comment',
                                'cond': {$eq: ['$$comment.user_id', new ObjectId(req.creator_id)]}
                            }
                        },
                        'as': 'comment',
                        'in': {
                            'likes': {$size: '$$comment.likes'}
                        }         
                    }
                }
            },
        }
    ]);
    var total_likes = 0;
    await Promise.all(
        evaluations.map(function(evaluation) {
            total_likes += evaluation.comments[0].likes
        })
    )
    await User.findByIdAndUpdate(
        req.creator_id, 
        {
            $set: {
                'likes': total_likes,
            }
        }
    )
    res.json('Complete')
}

exports.filter_comment = async(req, res, next) => {
    var id = new ObjectId(req.params.id);
    var rating_list = req.body.rating_list;
    var result = await Evaluation.aggregate([
        {$match: {'book_id': id}},
        {
            $project: {
                _id: null,
                'comments': {
                    $filter: {
                        'input': '$comments',
                        'as': 'comment',
                        'cond': {$in: ['$$comment.rating', rating_list]}
                    }
                },
            }
        }
    ]);
    res.json(result)
}
