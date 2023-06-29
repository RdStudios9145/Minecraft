const path = require("path");
const webpack = require("webpack")

module.exports = {
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.([cm]?ts|tsx)$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			"vars": path.resolve(__dirname, "./vars.ts")
		}
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: "development",
	plugins: [
		new webpack.ProvidePlugin({
			"vars": "vars"
		})
	]
}