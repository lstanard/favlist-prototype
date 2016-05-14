var cryptojs = require('crypto-js');

if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./scratch');
}

module.exports = function (db) {

	return {
		requireAuthentication: function (req, res, next) {
			var token = req.get('Auth') || '';
			// var token = localStorage.getItem('authToken') || '';

			db.token.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString()
				}
			}).then(function (tokenInstance) {
				if (!tokenInstance) {
					throw new Error();
				}

				req.token = tokenInstance;
				return db.user.findByToken(token);
			}).then(function (user) {
				req.user = user;
				next();
			}).catch(function () {
				res.status(401).send();
			});
		}
	};
};