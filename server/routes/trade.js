var express = require('express');
var router = express.Router();
var trade_controller = require('../controllers/tradeController');
var authentication = require('../middleware/authentication');
var authorization = require('../middleware/authorization');

router.get('/cart', authorization.verify_token, authorization.check_user, trade_controller.cart);

router.get('/order_list', authorization.verify_token, authorization.check_user, trade_controller.order_list);

router.get('/deliver_list', authorization.verify_token, authorization.check_user, trade_controller.deliver_list);

router.get('/quantity', authorization.verify_token, authorization.check_user, trade_controller.quantity);

router.post('/add_to_cart', authorization.verify_token, authorization.check_user, trade_controller.add_to_cart, trade_controller.quantity);

router.post('/remove_from_cart', authorization.verify_token, authorization.check_user, trade_controller.remove_from_cart, trade_controller.quantity);

router.post('/order', authorization.verify_token, authorization.check_user, trade_controller.order, trade_controller.order_list);

router.post('/cancel_order', authorization.verify_token, authorization.check_user, trade_controller.cancel_order);

router.post('/deliver', authorization.verify_token, authorization.check_user, trade_controller.deliver, trade_controller.deliver_list);

module.exports = router;