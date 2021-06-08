var express = require('express');
var router = express.Router();
var trade_controller = require('../controllers/tradeController');
var authentication = require('../middleware/authentication');
var authorization = require('../middleware/authorization');

router.post('/add_to_cart', authorization.verify_token, authorization.check_user, trade_controller.add_to_cart);

module.exports = router;