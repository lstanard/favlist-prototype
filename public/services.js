module.exports = function (app) {

	return app
		.factory('FavListService', function ($resource) {
			return $resource(
				'http://localhost:3000/lists/:listId',
				{ listId: '@listId' }
			);
		})
		.factory('FavListItemsService', function ($resource) {
			return $resource(
				'http://localhost:3000/lists/:listId/list-items/:listItemId',
				{ listId: '@listId', listItemId: '@listItemId' }
			);
		});
};