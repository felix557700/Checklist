var webpack = require('webpack');

module.exports = {
	entry: ['./frontend/app.js'],
	devtool: "#inline-sourcemap",
	output: {
		path: __dirname + '/frontend-public/',
		filename: 'bundle.js'
	},
	resolve: {
		modulesDirectories: ['node_modules', 'frontend'],
		extension: ['', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	debug: true,
	externals: {
		'angular': 'angular'
	}
};