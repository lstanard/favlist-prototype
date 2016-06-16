var express = require('express');
var _ = require('lodash');
var db = require(__dirname + './../db.js');
var middleware = require(__dirname + './../middleware.js')(db);
var router = express.Router();

var listParams = ['name', 'description'];

router.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// GET /lists?q=string
router.get('/', (req, res) => {
	var query = req.query;
	var where = {};

	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where.description = {
			$like: '%' + query.q + '%'
		};
	}

	db.list.findAll({where}).then((lists) => {
		res.json(lists);
	}, (e) => {
		res.status(500).send();
	});
});

// GET /lists/:id
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
	var body = _.pick(req.body, listParams);

	db.list.create(body).then((list) => {
		res.json(list.toJSON());
	}, (e) => {
		res.status(400).json(e);
	});
});

// DELETE /lists/:id
router.delete('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
	var listId = parseInt(req.params.id, 10);
	var body = _.pick(req.body, listParams);
	var attributes = {};

	listParams.forEach((param) => {
		if (body.hasOwnProperty(param)) {
			attributes[param] = body[param];
		}
	});

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

module.exports = router;