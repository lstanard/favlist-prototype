var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(require('./controllers'));

db.sequelize.sync({force: true}).then(() => {
	app.listen(PORT, () => {
		console.log('Listening on port ' + PORT);
	});
});