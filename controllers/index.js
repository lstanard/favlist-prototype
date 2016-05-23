// Using the express Router class
// https://www.terlici.com/2014/09/29/express-router.html

var express = require('express');
var router = express.Router();

router.use('/users', require('./users.js'));
router.use('/lists', require('./lists.js'));
router.use(require('./listItems.js'));

router.use(express.static('public'));

module.exports = router;