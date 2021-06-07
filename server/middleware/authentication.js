var User = require('../models/user');

exports.checkDuplicate = (req, res, next) => {
    User.findOne({ username: req.body.username }).exec((err, user) => {
        if (user) {
            return res.status(400).json({ status: 400, message: 'Username is already in use' });
        }
        User.findOne({ email: req.body.email }).exec((err, user) => {
            if (user) {
                return res.status(400).json({ status: 400, message: 'Email is already in use' });
            }
            next();
        });
    });
};
