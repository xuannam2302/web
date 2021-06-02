var User = require('../models/user');

exports.checkDuplicate = (req, res, next) => {
    User.findOne({username: req.body.username}).exec((err, user) => {
        if(user) {
            res.send({msg: 'Username is already in use'});
            return;
        }
        User.findOne({email: req.body.email}).exec((err, user) => {
            if(user) {
                res.send({msg: 'Email is already in use'});
                return;
            }
            next();
        });
    });
};
