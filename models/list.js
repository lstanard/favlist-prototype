module.exports = (sequelize, DataTypes) => {
	var list = sequelize.define('list', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1, 250]
			}
		}
	});

	return list;
};