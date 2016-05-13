var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var db = require('./db.js');
var middleware = require('./middleware.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

/*
	/lists routes
	------
*/

var listParams = ['name', 'listType', 'description'];

// GET /lists
app.get('/lists', (req, res) => {
	var query = req.query;

	db.list.findAll().then((lists) => {
		res.json(lists);
	}, (e) => {
		res.status(500).send();
	});
});

// GET /lists/:id
app.get('/lists/:id', (req, res) => {
	var listId = parseInt(req.params.id, 10);

	db.list.findOne({
		where: {
			id: listId
		}
	}).then((list) => {
		if (!!list)
			res.json(list.toJSON());
		else
			res.status(404).send();
	}, (e) => {
		res.status(500).send();
	});
});

// POST /lists
app.post('/lists', (req, res) => {
	var body = _.pick(req.body, listParams);

	db.list.create(body).then((list) => {
		res.json(list.toJSON());
	}, (e) => {
		res.status(400).json(e);
	});
});

// DELETE /lists/:id
app.delete('/lists/:id', (req, res) => {
	var listId = parseInt(req.params.id, 10);

	db.list.destroy({
		where: {
			id: listId
		}
	}).then((rowsDeleted) => {
		if (rowsDeleted === 0)
			res.status(404).json({error: 'No list found.'});
		else
			res.status(204).send();
	}, (e) => {
		res.status(500).send();
	});
});

// PUT /lists/:id
app.put('/lists/:id', (req, res) => {
	var listId = parseInt(req.params.id, 10);
	var body = _.pick(req.body, listParams);
	var attributes = {};

	if (body.hasOwnProperty('name'))
		attributes.name = body.name;

	if (body.hasOwnProperty('listType'))
		attributes.listType = body.listType;

	if (body.hasOwnProperty('description'))
		attributes.description = body.description;

	db.list.findOne({
		where: {
			id: listId
		}
	}).then((list) => {
		if (list) {
			list.update(attributes).then((list) => {
				res.json(list.toJSON());
			}, (e) => {
				res.status(400).json(e);
			});
		} else {
			res.status(404).send();
		}
	}, () => {
		res.status(500).send();
	});
});

db.sequelize.sync({force: true}).then(() => {
	app.listen(PORT, () => {
		console.log('Express listening on port ' + PORT);
	});
});