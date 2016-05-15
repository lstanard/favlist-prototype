// var request = require('request');
var base_url = 'http://localhost:3000/';
var app = require('../app.js');
var assert = require('chai').assert;

app.startServer();

describe('Test /lists routes', () => {
	describe('GET /', () => {
		// it('returns status code 200', (done) => {
		// 	request.get(base_url, (error, response, body) => {
		// 		assert.equal(200, response.statusCode);
		// 		app.closeServer();
		// 		done();
		// 	});
		// });

		// it('returns FavList App Prototype', (done) => {
		// 	request.get(base_url, (error, response, body) => {
		// 		assert.equal('FavList App Prototype', body);
		// 		done();
		// 	});
		// });
	});
});