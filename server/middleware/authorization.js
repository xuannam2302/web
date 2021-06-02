var User = require('../models/user');
var jwt = require('jsonwebtoken');
var {secret_key} = require('../config/config');

exports.verify_token = function(req, res, next) {
    //var token = req.headers.authorization.split(' ')[1];
    var token = localStorage.getItem('access_token');
    if(!token) {
        return res.send('No token provided');
    }
    jwt.verify(token, secret_key, (err, decoded) => {
        if(err) {
            return res.send('Unaccessible');
        }    
        req.user_id = decoded.id;
        next();
    })
};

exports.check_user = function(req, res, next) {
    User.findById(req.user_id).exec((err, user) => {
        if(err) {
            return res.send({msg: err});
        }
        if(user.user) {
            next();
            return;
        }
        return res.send({msg: 'No user role'});
    });
}

exports.check_admin = function(req, res, next) {
    User.findById(req.user_id).exec((err, user) => {
        if(err) {
            return res.send({msg: err});
        }
        if(user.admin) {
            next();
            return;
        }
        return res.send({msg: 'No admin role'});
    });
}

exports.check_manager = function(req, res, next) {
    User.findById(req.user_id).exec((err, user) => {
        if(err) {
            return res.send({msg: err});
        }
        if(user.manager) {
            next();
            return;
        }
        return res.send({msg: 'No manager role'});
    });
}