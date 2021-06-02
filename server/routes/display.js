var express = require('express');
var router = express.Router();

var display_controller = require('../controllers/displayController');

//var manage_controller = require('../controllers/manageController');

/* GET home page. */
router.get('/', display_controller.display_all);
//router.get('/search', display_controller.search_get);
router.post('/search', display_controller.search);
router.get('/book/:id', display_controller.display_book);



module.exports = router;