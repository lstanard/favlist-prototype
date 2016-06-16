// var CleanPlugin = require('clean-webpack-plugin');
// var SvgStore = require('webpack-svgstore-plugin');
var path 						= require('path');
var webpack 					= require('webpack');
var ModernizrWebpackPlugin 		= require('modernizr-webpack-plugin');
var WebpackNotifierPlugin 		= require('webpack-notifier');
var ExtractPlugin 				= require('extract-text-webpack-plugin');
var autoprefixer 				= require('autoprefixer');
var cssnano 					= require('cssnano');

// production build flag
var production = false;

// modernizr object
var modernizrConfig = {
	'filename': 'modernizr.js',
	'options': [
		"setClasses",
	],
	'feature-detects': [
		"css/flexbox",
		"css/flexboxlegacy",
		"css/flexboxtweener",
		"css/flexwrap"
	],
	minify: true
}

var plugins = [

	// look for jquery in every module and provide jquery if it's referenced
	new webpack.ProvidePlugin({
		jQuery: "jquery",
		"window.jQuery": "jquery"
	}),

	// toast whenever the build fails
	new WebpackNotifierPlugin(),

	// build modernizr
	new ModernizrWebpackPlugin(modernizrConfig),

	// extract out css to a file to be included at the top of our site
	new ExtractPlugin('../css/[name].css', { allChunks: true }),

	// use the old watch so our scss triggers changes
	new webpack.OldWatchingPlugin(),
];

if (production) {
	plugins = plugins.concat([

		// This plugin looks for similar chunks and files
		// and merges them for better caching by the user
		new webpack.optimize.DedupePlugin(),

		// This plugins optimizes chunks and modules by
		// how much they are used in your app
		new webpack.optimize.OccurenceOrderPlugin(),

		// This plugin prevents Webpack from creating chunks
		// that would be too small to be worth loading separately
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 51200, // ~50kb
		}),

		// This plugin minifies all the Javascript code of the final bundle
		new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			compress: {
				warnings: false, // Suppress uglification warnings
			},
		})
	]);
}

module.exports = {
	entry: {
		"main": "./public/main.js"
	},
	plugins: plugins,
	output: {
		path: __dirname + '/public/js/',
		filename: "[name].entry.js"
	},
	module: {
		loaders: [
			{
				test: /\.scss$/i,
				loader: ExtractPlugin.extract(['css', 'postcss', 'sass'])
			},
			{
				test: /\.html/,
				loader: 'html',
			},
			{
				test: /\.(png|gif|jpe?g|svg)$/i,
				loader: 'url?limit=25000'
			}
		]
	},
	postcss: [
		autoprefixer({
			browsers: ['last 4 versions']
		}),
		// Reference: http://cssnano.co/optimisations/
		cssnano({
			'postcss-discard-comments': production,
			'postcss-discard-empty': production
		})
	]
};