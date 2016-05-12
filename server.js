var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var db = require('./db.js');

var app = express();

// Environment vars
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// Load views from /public dir
app.use(express.static('public'));

// GET /lists
app.get('/lists', (req, res) => {

});

// GET /lists/:id
app.get('/lists/:id', (req, res) => {

});

// POST /lists
app.post('/lists', (req, res) => {
	var body = _.pick(req.body, 'name', 'listType', 'description');

	db.list.create(body).then((list) => {
		res.json(list.toJSON());
	}, function (e) {
		res.status(400).json(e);
	});
});

// DELETE /lists/:id
app.delete('/lists/:id', (req, res) => {

});

// PUT /lists/:id
app.put('/lists/:id', (req, res) => {

});

db.sequelize.sync({force: true}).then(function () {
	app.listen(PORT, function () {
		console.log('Express listening on port ' + PORT);
	});
});