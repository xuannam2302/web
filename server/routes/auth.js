var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');
var authentication = require('../middleware/authentication');
var authorization = require('../middleware/authorization');

router.post('/register', authentication.checkDuplicate, auth_controller.register);

router.get('/confirmation/:token', auth_controller.confirmation);

router.post('/resend_verify', auth_controller.resend_verify);

router.post('/login', auth_controller.login);

module.exports = router;

