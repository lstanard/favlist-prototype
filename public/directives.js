module.exports = function (app) {

	return app
		.directive('itemRating', function () {
			return {
				restrict: 'E',
				scope: {
					rating: '=rating'
				},
				template: function (elem, attr) {
					var temp  = '<span ng-if="rating >= 1">⭐</span>';
						temp += '<span ng-if="rating >= 2">⭐</span>';
						temp += '<span ng-if="rating >= 3">⭐</span>';
						temp += '<span ng-if="rating >= 4">⭐</span>';
						temp += '<span ng-if="rating >= 5">⭐</span>';
					return temp;
				}
			};
		});
};