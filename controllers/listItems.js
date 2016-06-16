var express = require('express');
var _ = require('lodash');
var db = require(__dirname + './../db.js');
var middleware = require(__dirname + './../middleware.js')(db);
var router = express.Router();

var listItemParams = ['name', 'notes', 'rating'];

// GET /lists/:id/list-items
router.get('/lists/:listId/list-items', (req, res) => {
	var listId = parseInt(req.params.listId, 10);

	db.listItem.findAll({
		where: {
			listId: listId
		}
	}).then((listItems) => {
		res.json(listItems);
	}, (e) => {
		res.status(500).send();
	});
});

// POST /lists/:list-id/list-items
router.post('/lists/:listId/list-items', (req, res) => {
	var body = _.pick(req.body, listItemParams);
	var listId = parseInt(req.params.listId, 10);

	db.listItem.create(body).then((listItem) => {
		db.list.findById(listId).then((listInstance) => {
			if (listInstance) {
				listInstance.addListItem(listItem).then(() => {
					return listItem.reload();
				}).then((listItem) => {
					res.json(listItem.toJSON());
				});
			} else {
				return res.status(404).send();
			}
		});
	}, (e) => {
		res.status(400).json(e);
	});
});

// DELETE /lists/:listId/list-items/:id
router.delete('/lists/:listId/list-items/:id', (req, res) => {
	var listId = parseInt(req.params.listId, 10);
	var listItemId = parseInt(req.params.id, 10);

	db.listItem.destroy({
		where: {
			id: listItemId,
			listId: listId
		}
	}).then((rowsDeleted) => {
		if (rowsDeleted === 0)
			res.status(404).json({error: 'No list item found.'});
		else
			res.status(204).send();
	}, (e) => {
		res.status(500).send();
	});
});

// PUT /lists/:listId/list-items/:id
router.put('/lists/:listId/list-items/:id', (req, res) => {
	var listId = parseInt(req.params.listId, 10);
	var listItemId = parseInt(req.params.id, 10);
	var body = _.pick(req.body, listItemParams);
	var attributes = {};

	// TODO: Could this be refactored/moved to avoid duplication with
	// essentially the same method in the controllers/lists.js PUT action?
	listItemParams.forEach((param) => {
		if (body.hasOwnProperty(param)) {
			attributes[param] = body[param];
		}
	});

	db.listItem.findOne({
		where: {
			id: listItemId,
			listId: listId
		}
	}).then((listItem) => {
		if (listItem) {
			listItem.update(attributes).then((listItem) => {
				res.json(listItem.toJSON());
			});
		} else {
			res.status(404).send();
		}
	}, () => {
		res.status(500).send();
	});
});

module.exports = router;