module.exports = (sequelize, DataTypes) => {
	var listItem = sequelize.define('listItem', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		notes: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1, 1000]
			}
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				len: [1]
			}
		}
	});

	return listItem;
};