var css = require('./scss/main.scss');
var angular = require('angular');
var ngResource = require('angular-resource');
var _ = require('lodash');

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
		favlist.addListItem = function (list) {
			var newListItem = FavListItemsService.save(
				{ listId: list.id, name: list.listitem.name, notes: list.listitem.notes, rating: list.listitem.rating },
				function () {
					// TODO: Can't get setPristine to work
					// console.log($scope.form.addListItemForm);
					// list.addListItemForm.$setPristine();
					list.listItems.unshift(newListItem);
				}
			);
		}

		// Remove list item action
		favlist.removeListItem = function (list, listItem) {
			FavListItemsService.delete(
				{ listId: list.id, listItemId: listItem.id },
				function () {
					// TODO: Not properly removing from local list scope
					// list.listItems = _.remove(list.listItems, function(n) {
					// 	return n.id = listItem.id;
					// });
				}
			);
		}
	});