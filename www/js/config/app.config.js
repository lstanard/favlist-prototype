angular.module('starter').config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('lists', {
		url: '/lists',
		templateUrl: 'templates/lists.html'
	});

	$urlRouterProvider.otherwise('/lists');
}