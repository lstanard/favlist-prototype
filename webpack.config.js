module.exports = {
    entry: {
    	"main": "./public/main.js"
    },
    output: {
		path: __dirname + '/public/js/',
        filename: "[name].entry.js"
    },
    module: {
        loaders: [
            {
            	test: /\.scss$/,
            	loader: "style!css!sass"
            }
        ]
    }
};