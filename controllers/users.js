var express = require('express');
var router = express.Router();
var _ = require('lodash');
var db = require(__dirname + './../db.js');
var middleware = require(__dirname + './../middleware.js');

var userParams = ['email', 'name'];

// POST /users
router.post('/', (req, res) => {
	var body = _.pick(req.body, userParams);
});

module.exports = router;