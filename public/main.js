var css = require('./scss/main.scss');
var angular = require('angular');
var ngResource = require('angular-resource');

var favlistApp = angular.module('favlist', ['ngResource']);

// Services
favlistApp
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

// Filters
// favlistApp
// 	.filter('ratings', function () {
// 		return function () {

// 		}
// 	});

// Controllers
favlistApp
	.controller('FavListController', function ($scope, $http, FavListService, FavListItemsService) {
		var favlist = this;

		// Retrieve lists
		favlist.lists = FavListService.query(function () {
			// Retrieve list items
			favlist.lists.forEach(function (list) {
				list.listItems = FavListItemsService.query(
					{ listId: list.id }
				);
			});
		});

		// Add list action
		favlist.addList = function () {
			var newList = FavListService.save(
				{ name: favlist.name, description: favlist.description },
				function () {
					favlist.lists.unshift(newList);
				}
			);
		}

		// Remove list action
		favlist.removeList = function (index) {
			var listId = favlist.lists[index].id;
			FavListService.delete(
				{ listId: listId },
				function () {
					favlist.lists.splice(index, 1);
				}
			);
		}

		// Remove list item action
		favlist.removeListItem = function (listIndex, listItemIndex) {
			var listId = favlist.lists[listIndex].id;
			var listItemId = favlist.lists[listIndex].listItems[listItemIndex].id;

			FavListItemsService.delete(
				{ listId: listId, listItemId: listItemId },
				function () {
					// Remove from local $scope
					favlist.lists[listIndex].listItems.splice(listItemIndex, 1);
				}
			);
		}
	});