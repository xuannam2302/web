var express = require('express');
var router = express.Router();
var trade_controller = require('../controllers/tradeController');
var authentication = require('../middleware/authentication');
var authorization = require('../middleware/authorization');

router.get('/cart', authorization.verify_token, authorization.check_user, trade_controller.cart);

router.post('/add_to_cart', trade_controller.add_to_cart);

router.post('/remove_from_cart', authorization.verify_token, authorization.check_user, trade_controller.remove_from_cart);

router.post('/order', authorization.verify_token, authorization.check_user, trade_controller.order);

router.post('/cancel_order', authorization.verify_token, authorization.check_user, trade_controller.cancel_order);

module.exports = router;