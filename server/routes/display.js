var express = require('express');
var router = express.Router();

var display_controller = require('../controllers/displayController');
var evaluation_controller = require('../controllers/evaluationController');
var authorization = require('../middleware/authorization'); 

//var manage_controller = require('../controllers/manageController');

/* GET home page. */
router.get('/', display_controller.display_all);
router.post('/search', display_controller.search);
router.get('/book/:id', display_controller.display_book);

// router.post('/book/:id/rating', authorization.verify_token, authorization.check_user, evaluation_controller.rating);

router.post('/book/:id/post_comment', authorization.verify_token, authorization.check_user, evaluation_controller.post_comment, evaluation_controller.update_rating);

router.post('/book/:id/delete_comment', authorization.verify_token, authorization.check_user, evaluation_controller.delete_comment, evaluation_controller.update_rating);

router.post('/book/:id/:comment_id/post_answer', authorization.verify_token, authorization.check_user, evaluation_controller.post_answer);

router.post('/book/:id/:comment_id/delete_answer', authorization.verify_token, authorization.check_user, evaluation_controller.delete_answer);

router.post('/book/:id/:comment_id/like', authorization.verify_token, authorization.check_user, evaluation_controller.like, evaluation_controller.update_likes);

router.post('/book/:id/:comment_id/unlike', authorization.verify_token, authorization.check_user, evaluation_controller.unlike, evaluation_controller.update_likes);

router.post('/book/:id/filter_comment', evaluation_controller.filter_comment);

module.exports = router;