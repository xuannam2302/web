var express = require('express');
var router = express.Router();
var manage_controller = require('../controllers/manageController');
var authorization = require('../middleware/authorization');
/* GET users listing. */

router.get('/', authorization.verify_token, authorization.check_admin, manage_controller.book_manage);

router.post('/create', authorization.verify_token, authorization.check_admin, manage_controller.book_create_post);

router.post('/update/:id', authorization.verify_token, authorization.check_admin, manage_controller.book_update_post);

router.post('/delete/:id', authorization.verify_token, authorization.check_admin, manage_controller.book_delete_post);

module.exports = router;
