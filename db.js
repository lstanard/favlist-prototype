var Sequelize = require('sequelize');
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
}

var db = {};

db.user = sequelize.import(__dirname + '/models/user.js');
db.list = sequelize.import(__dirname + '/models/list.js');
db.token = sequelize.import(__dirname + '/models/token.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user.hasMany(db.list);
db.list.belongsTo(db.user);

module.exports = db;