var angular = require('angular');
var omit = require('lodash/omit');
// var _ = require('lodash');

angular.module('favlist', [])
	.controller('FavListController', function ($scope, $http) {
		var favlist = this;

		// Retrieve lists
		$http({
			method: 'GET',
			url: 'http://localhost:3000/lists'
		}).then(function successCallback(response) {
			favlist.lists = response.data;
		}, function errorCallback(response) {
			console.log(response);
		});

		// Add list action
		favlist.addList = function () {
			$http({
				method: 'POST',
				url: 'http://localhost:3000/lists',
				data: {
					name: favlist.name,
					description: favlist.description
				}
			}).then(function successCallback(response) {
				favlist.lists.push(response.data);
			}, function errorCallback(response) {
				console.log(response);
			});
		}

		// Remove list action
		favlist.removeList = function (index) {
			var listId = favlist.lists[index].id;
			$http({
				method: 'DELETE',
				url: 'http://localhost:3000/lists/' + listId
			}).then(function successCallback(response) {
				favlist.lists.splice(index, 1);
			}, function errorCallback(response) {
				console.log(response);
			});
		}
	});