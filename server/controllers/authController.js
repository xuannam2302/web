var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var sendgrid = require('nodemailer-sendgrid-transport');
var crypto = require('crypto');

var {secret_key, sendgrid_api_key} = require('../config/config');
var User = require('../models/user');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

exports.register = function(req, res) {
    // console.log(req.body);
    // console.log("Acvbgb");
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });
    user.save((err, user) => {
        if(err) {
            console.log(err.message);
            res.send({msg: err});
            return;
        }
        var token = jwt.sign({id: user.id}, secret_key, {
            expiresIn: 3 * 60 * 60
        });
        localStorage.setItem('access_token', token);
        if(user) {
            // console.log(2);
            // res.send({msg: 'User was registered successfully'});
            var transporter = nodemailer.createTransport(sendgrid({
                auth: {
                    api_key: sendgrid_api_key
                }
            }));
            var mailOptions = { from: 'thuhuonghv1978@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link\nhttp:\/\/' + req.headers.host + '\/auth\/confirmation\/' + token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.send({ send_mail: err.message }); }
                res.send('A verification email has been sent to ' + user.email + '.');
            });
            return;
        }
    }) 
};

exports.confirmation = function(req, res, next) {
    console.log(req.params.token);
    token = req.params.token;
    token = token.slice(0, -1);
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
        if(!user.verified) {
            res.send({access_token: null, msg: "This account is not verified"});
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
            username: user.username,
            email: user.email,
            user: user.user,
            admin: user.admin,
            manager: user.manager,
            token: token
        });
    });
};




