var path 				= require('path');
var ExtractTextPlugin 	= require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		"main": "./public/main.js"
	},
	plugins: [
		new ExtractTextPlugin('../css/[name].css', { allChunks: true })
	],
	output: {
		path: __dirname + '/public/js/',
		filename: "[name].entry.js"
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css!sass')
			}
		]
	}
};