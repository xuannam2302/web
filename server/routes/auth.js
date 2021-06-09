var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');
var authentication = require('../middleware/authentication');
var authorization = require('../middleware/authorization');

router.post('/register', authentication.checkDuplicate, auth_controller.register);

router.get('/confirmation/:token', auth_controller.confirmation);

router.post('/resend_verify', auth_controller.resend_verify);

router.post('/login', auth_controller.login);

router.post('/refresh_token', auth_controller.refresh_token);

router.post('/refresh_token/delete', auth_controller.delete_refresh_token);

router.get('/information', authorization.verify_token ,auth_controller.get_information);

module.exports = router;

