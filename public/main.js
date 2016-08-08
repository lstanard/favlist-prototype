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
		favlist.removeList = function (list) {
			var index = _.indexOf(favlist.lists, _.find(favlist.lists, { id: list.id }));

			FavListService.delete(
				{ listId: list.id },
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
					var index = _.indexOf(favlist.lists, _.find(favlist.lists, { id: list.id }));
					var itemIndex = _.indexOf(favlist.lists[index].listItems, _.find(favlist.lists[index].listItems, { id: listItem.id }));
					favlist.lists[index].listItems.splice(itemIndex, 1);
				}
			);
		}
	});