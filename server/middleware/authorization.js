var User = require('../models/user');
var jwt = require('jsonwebtoken');
var {secret_key, refresh_key, sendgrid_api_key} = require('../config/config');
var refresh_tokens = require('../controllers/authController').refresh_tokens;
const { json } = require('body-parser');

exports.verify_and_refresh_token = function(req, res, next) {
    //var token = localStorage.getItem('access_token');
    var token = req.headers['x-access-token'];
    if(!token) {
        return res.status(403).send('No token provided');
    }
    var refresh_token = req.body.refresh_token;
    if(!refresh_token) return json({msg: 'No refresh token provided'});
    jwt.verify(token, secret_key, (err, decoded) => {
        if(err) {
            if(err.name == "TokenExpiredError") {
                if((refresh_token in refresh_tokens) && (refresh_tokens[refresh_token] == req.body.id)) {
                    var token = jwt.sign({id: req.body.id}, secret_key, {
                        expiresIn: 60 * 60 * 12,
                    });
                    delete refresh_tokens[refresh_token];
                    refresh_token = jwt.sign({id: req.body.id}, refresh_key);
                    refresh_tokens[refresh_token] = req.body.id;
                    req.user_id = req.body.id;
                    req.token_info = {token: token, refresh_token: refresh_token, id: req.body.id};
                    next();
                }
                else {
                    return res.json({msg: 'Invalid refresh token'});
                }
            }
            else {
                return res.json({msg: err.name});
            }
        }
        else {
            req.user_id = decoded.id;
            req.token_info = {token: token, refresh_token: refresh_token, id: decoded.id};
            next();
        }
    })
};

exports.verify_token = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if(!token) {
        return res.status(403).send('No token provided');
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

