const webpack = require("webpack");
const path = require("path");
const copy = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = () => {
	return {
		mode: "production",
		// entry: ["babel-polyfill", path.join(__dirname, "../server.js")],
		entry: {
			index: './server.js',
			'bundled-client': './src/index.js',
		  },
		output: {
			path: path.resolve(__dirname, `../dist`),
			publicPath: "/",
			filename: '[name].js',
			// filename: `index.js`,
		},
		target: "node",
		node: {
			// Need this when working with express, otherwise the build fails
			__dirname: false, // if you don't put this is, __dirname
			__filename: false, // and __filename return blank or /
		},
		externals: [nodeExternals()], // Need this to avoid error when working with Express
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					  }
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader', 'postcss-loader'], // Process CSS files
				  },
			],
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false,
				noInfo: false,
			}),
			new copy([
				{
					from: `../videos`,
					to: `../dist/videos`,
					toType: "file",
				}
			]),
		],
	};
};
