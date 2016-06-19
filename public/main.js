var css = require('./scss/main.scss');
var angular = require('angular');
var ngResource = require('angular-resource');

var favlistApp = angular.module('favlist', ['ngResource']);

favlistApp
	.factory('FavListService', function ($resource) {
		return $resource('http://localhost:3000/lists/:id', {id: '@id'});
	});

favlistApp
	.controller('FavListController', function ($scope, $http, FavListService) {
		var favlist = this;

		// Retrieve lists
		favlist.lists = FavListService.query();

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
				{ id: listId },
				function () {
					favlist.lists.splice(index, 1);
				}
			);
		}
	})
	.controller('FavListItemsController', function ($scope) {
		var favlistItems = this;
	});