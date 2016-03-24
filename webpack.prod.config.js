var webpack = require('webpack');

module.exports = {
	entry: ['./frontend/app.js'],
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
	}
	//plugins: debug ? [] : [
	//	new webpack.optimize.DedupePlugin(),
	//	new webpack.optimize.OccurenceOrderPlugin(),
	//	new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
	//	new webpack.optimize.UglifyJsPlugin(),
	//	new webpack.optimize.DedupePlugin(),
	//	new CompressionPlugin({
	//	asset: '{file}.gz',
	//	algorithm: 'gzip',
	//	threshold: 10240,
	//	minRatio: 0.8
	//} )
	//]
};