var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');
var authentication = require('../middleware/authentication');
var authorization = require('../middleware/authorization');

router.post('/register', authentication.checkDuplicate, auth_controller.register);

router.post('/login', auth_controller.login);

module.exports = router;