module.exports = {
	cache: true,
	entry: [
		__dirname + '/demo'
	],
	output: {
		publicPath: __dirname,
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /\.css$/, loader: 'css-loader' 
		}
		]
	}
};
