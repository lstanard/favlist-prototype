var express = require('express');
var db = require('./db.js');

var app = express();

// Environment vars
var PORT = process.env.PORT || 3000;

// Load views from /public dir
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});