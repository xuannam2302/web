var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var {secret_key} = require('../config/config');
var User = require('../models/user');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

exports.register = function(req, res) {
    
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });
    user.save((err, user) => {
        if(err) {
            res.send({msg: err});
            return;
        }
        if(user) {
            res.send({msg: 'User was registered successfully'});
            return;
        }
    }) 
};

exports.login = function(req, res, next) {
    User.findOne({username: req.body.username}).exec((err, user) => {
        if(!user) {
            res.send({msg: "Incorrect Username"});
            return;
        }
        var password_check = bcrypt.compareSync(req.body.password, user.password);
        if(!password_check) {
            res.send({access_token: null, msg: "Incorrect Password!"});
            return;
        }
        var token = jwt.sign({id: user.id}, secret_key, {
            expiresIn: 3 * 60 * 60
        });
        res.cookie('access_token', token, {
            maxAge: 1000 * 3 * 60 * 60,  
            httpOnly: false, 
            secure: false,
        });
        localStorage.setItem('access_token', token);
        res.send({
            id: user._id,
            username: user.username,
            email: user.email,
        });
    });
};

exports.user_region = function(req, res, next) {
    res.send('Admin region here');
}




