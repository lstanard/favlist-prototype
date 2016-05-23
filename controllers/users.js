var express = require('express');
var router = express.Router();
var _ = require('lodash');
var db = require(__dirname + './../db.js');
var middleware = require(__dirname + './../middleware.js')(db);

var userParams = ['email', 'name', 'password'];

// POST /users
router.post('/', function (req, res) {
	var body = _.pick(req.body, userParams);

	db.user.create(body).then(function (user) {
		res.json(user.toPublicJSON());
	}, function (e) {
		res.status(400).json(e);
	});
});

// POST /users/login
router.post('/login', function (req, res) {
	var body = _.pick(req.body, 'email', 'password');
	var userInstance;

	db.user.authenticate(body).then(function (user) {
		var token = user.generateToken('authentication');
		userInstance = user;

		return db.token.create({
			token: token
		});
	}).then(function (tokenInstance) {
		// localStorage('authToken', tokenInstance);
		res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
	}).catch(function () {
		res.status(401).send();
	});
});

// DELETE /users/login
router.delete('/login', middleware.requireAuthentication, function (req, res) {
	req.token.destroy().then(function () {
		res.status(204).send();
	}).catch(function () {
		res.status(500).send();
	});
});

module.exports = router;