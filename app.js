// I like this application structure, and it has tips for mocha tests (https://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/)

var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;

var exports = module.exports = {};
var server;

app.use(bodyParser.json());
app.use(require('./controllers'));

db.sequelize.sync({force: true}).then(() => {
	exports.startServer();
});

exports.closeServer = () => {
	server.close();
	console.log('Server stopped');
};

exports.startServer = () => {
	server = app.listen(PORT, () => {
		console.log('Listening on port ' + PORT);
	});
};