var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var sendgrid = require('nodemailer-sendgrid-transport');
var randtoken = require('rand-token');

var {secret_key, refresh_key, sendgrid_api_key} = require('../config/config');
var User = require('../models/user');
var Trader = require('../models/trader').Trader;
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
            console.log(err.message);
            res.status(500).send({msg: err});
            return;
        }
        var token = jwt.sign({id: user.id}, secret_key, {
            expiresIn: 3 * 60 * 60
        });
        //localStorage.setItem('access_token', token);
        if(user) {
            var transporter = nodemailer.createTransport(sendgrid({
                auth: {
                    api_key: sendgrid_api_key
                }
            }));
            var mailOptions = { from: 'thuhuonghv1978@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link\nhttp:\/\/' + req.headers.host + '\/auth\/confirmation\/' + token + '\n' };
            transporter.sendMail(mailOptions);
            res.json({msg: 'User was registered successfully', token: token});
            return;
        }
    }) 
};

exports.confirmation = function(req, res, next) {
    token = req.params.token;
    jwt.verify(token, secret_key, (err, decoded) => {
        if(err) {
            return res.send('Unaccessible');
        }    
        User.findById(decoded.id).exec((err, user) => {
            if(err) return res.send('Verifying error');
            if(!user) return res.send('Invalid account');
            if(user.verified) return res.send('This account has already been verified');
            user.verified = true;
            user.save((err) => {
                if(err) return res.send({msg: err.message});
                res.send({msg: 'This account has been verified'});
            })
        });
    });
};

exports.resend_verify = function(req, res, next) {
    User.findOne({username: req.body.username}).exec((err, user) => {
        if(err) return res.status(400).json({status: 400, message: err.message});
        if(user) {
            var token = jwt.sign({id: user.id}, secret_key, {
                expiresIn: 3 * 60 * 60
            });
        }
        var transporter = nodemailer.createTransport(sendgrid({
            auth: {
                api_key: sendgrid_api_key
            }
        }));
        var mailOptions = { from: 'thuhuonghv1978@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link\nhttp:\/\/' + req.headers.host + '\/auth\/confirmation\/' + token + '\n' };
        transporter.sendMail(mailOptions, function (err) {
            if (err) { return res.status(400).json({status: 400, message: err.message}); }
            res.send('A verification email has been sent to ' + user.email + '.');
        });
        return;
    })
}

var refresh_tokens = {};

exports.login = function(req, res, next) {
    User.findOne({username: req.body.username}).exec((err, user) => {
        if(!user) {
            return res.status(400).json({status: 400, message: "Incorrect Username or Password"});
        }
        var password_check = bcrypt.compareSync(req.body.password, user.password);
        if(!password_check) {
            return res.status(400).json({status: 400, message: "Incorrect Username or Password"});
        }
        //have not verified email
        if(!user.verified) {
            return res.status(400).json({status: 400, message: "This account is not verified"});
        }
        var token = jwt.sign({id: user.id}, secret_key, {
            expiresIn: 60 * 60 * 3
        });
        var refresh_token = jwt.sign({id: user.id}, refresh_key);
        // res.cookie('access_token', token, {
        //     maxAge: 1000 * 3 * 60 * 60,  
        //     httpOnly: false, 
        //     secure: false,
        // });
        //localStorage.setItem('access_token', token);
        //localStorage.setItem('refresh_token', refresh_token)
        refresh_tokens[refresh_token] = user.id;
        console.log(refresh_tokens);
        res.json({
            send_back: {
                id: user.id,
                token: token,
                refresh_token: refresh_token,
            },
            unsend_back: {
                username: user.username,
                email: user.email,
                user: user.user,
                admin: user.admin,
                manager: user.manager,
                msg: 'Successfully logged in',
            }          
        });
    });
};

exports.refresh_token = function(req, res, next) {
    //var refresh_token = localStorage.getItem('refresh_token');
    console.log(req.body);
    var refresh_token = req.body.refresh_token;
    console.log(refresh_tokens);
    if((refresh_token in refresh_tokens) && (refresh_tokens[refresh_token] == req.body.id)) {
        var token = jwt.sign({id: req.body.id}, secret_key, {
            expiresIn: 60 * 60 * 3,
        });
        delete refresh_tokens[refresh_token];
        refresh_token = jwt.sign({id: req.body.id}, refresh_key);
        refresh_tokens[refresh_token] = req.body.id;
        //localStorage.clear();
        //localStorage.setItem('access_token', token);
        //localStorage.setItem('refresh_token', refresh_token);
        console.log("ABC");
        return res.json({token: token, refresh_token: refresh_token, id: req.body.id});
    };
    res.status(401).json({msg: 'No refresh token provided'});
}

exports.delete_refresh_token = function(req, res, next) {
    //var refresh_token = localStorage.getItem('refresh_token');
    var refresh_token = req.body.refresh_token;
    if(refresh_token in refresh_tokens) {
        delete refresh_tokens[refresh_token];
    }
    //localStorage.clear();
    res.json({msg: 'Logged out'});
}

exports.get_information = function(req, res, next) {
    User.findById(req.user_id).exec((err, user) => {
        if(err) return res.status(400).json({msg: err});
        if(!user) return res.status(500).json({msg: 'No user found'});
        res.json({
            username: user.username,
            email: user.email,
            user: user.user,
            admin: user.admin,
            manager: user.manager,
        })
    })
}