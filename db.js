var Sequelize = require('sequelize');
var sequelize_fixtures = require('sequelize-fixtures');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		dialect: 'sqlite',
		storage: __dirname + '/data/favlist.sqlite'
	});

	// Setup test data
	var models = {
		user: require('./models/user'),
		list: require('./models/list'),
		listItem: require('./models/listItem'),
		token: require('./models/token')
	};

	// TODO: Fix
	// sequelize_fixtures.loadFile('./fixtures/test-data.js', models).then(() => {
	// 	console.log('Test data loaded');
	// });
}

var db = {};

db.user = sequelize.import(__dirname + '/models/user.js');
db.list = sequelize.import(__dirname + '/models/list.js');
db.listItem = sequelize.import(__dirname + '/models/listItem.js');
db.token = sequelize.import(__dirname + '/models/token.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// TODO: onDelete cascade isn't working
db.user.hasMany(db.list, {onDelete: 'cascade'});
db.list.belongsTo(db.user);
db.list.hasMany(db.listItem, {onDelete: 'cascade'});
db.listItem.belongsTo(db.list);

module.exports = db;