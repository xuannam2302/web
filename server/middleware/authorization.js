var User = require('../models/user');
var jwt = require('jsonwebtoken');
var {secret_key, refresh_key, sendgrid_api_key} = require('../config/config');
var refresh_tokens = require('../controllers/authController').refresh_tokens;
const { json } = require('body-parser');

exports.verify_token = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if(!token) {
        return res.status(403).json({msg: 'No token provided'});
    }
    jwt.verify(token, secret_key, (err, decoded) => {
        if(err) return res.json({msg: 'Token is expired'});
        req.user_id = decoded.id;
        next();
    })
}

exports.check_user = function(req, res, next) {
    User.findById(req.user_id).exec((err, user) => {
        if(err) {
            return res.status(500).send({msg: err});
        }
        if(user.user) {
            next();
            return;
        }
        return res.status(403).send({msg: 'No user role'});
    });
}

exports.check_admin = function(req, res, next) {
    User.findById(req.user_id).exec((err, user) => {
        if(err) {
            return res.status(500).send({msg: err});
        }
        if(user.admin) {
            next();
            return;
        }
        return res.status(403).send({msg: 'No admin role'});
    });
}

exports.check_manager = function(req, res, next) {
    User.findById(req.user_id).exec((err, user) => {
        if(err) {
            return res.status(500).send({msg: err});
        }
        if(user.manager) {
            next();
            return;
        }
        return res.status(403).send({msg: 'No manager role'});
    });
}

