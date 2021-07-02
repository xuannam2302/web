var Book = require('../models/book');
var Evaluation = require('../models/evaluation');
var User = require('../models/user');

var async = require('async')

exports.live_post = function(socket, id) {
    async.parallel({
        book: function(callback) {
            Book.findById(id).exec(callback);
        },
        evaluation: function(callback) {
            Evaluation.findOne({ book_id: id }).populate('rating.user_id', 'username evaluations likes')
                        .populate('comments.user_id', 'username evaluations likes').populate('comments.answers.user_id', 'username')
                        .populate('comments.likes.user_id', 'username').exec(callback);
        },
    }, function(err, result) {
        result.evaluation.comments = result.evaluation.comments.sort((comment1, comment2) => { return (comment2.create_at - comment1.create_at) });
        socket.emit('update_post', { evaluation: result.evaluation });
    })
}