module.exports = function (sequelize, DataTypes) {
	var list = sequelize.define('list', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		listType: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		}
	});

	return list;
};