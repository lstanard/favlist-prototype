var css = require('./scss/main.scss');
var angular = require('angular');
var ngResource = require('angular-resource');

var favlistApp = angular.module('favlist', ['ngResource']);

var services = require('./services.js')(favlistApp);
var directives = require('./directives.js')(favlistApp);

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

		// Add list item action
		favlist.addListItem = function (listIndex) {
			// TODO: Creating a new list and immediately adding an item results in an error

			var listId = favlist.lists[listIndex].id;

			var newListItem = FavListItemsService.save(
				{ listId: listId, name: favlist.listitem.name, notes: favlist.listitem.notes, rating: favlist.listitem.rating },
				function () {
					favlist.lists[listIndex].listItems.unshift(newListItem);
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
					favlist.lists[listIndex].listItems.splice(listItemIndex, 1);
				}
			);
		}
	});