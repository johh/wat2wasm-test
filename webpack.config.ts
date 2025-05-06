import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';


const isProduction = process.env.NODE_ENV === 'production';

const plugins: webpack.Configuration['plugins'] = [
	new webpack.ProgressPlugin(),
	new webpack.DefinePlugin( {
		__IS_PRODUCTION_BUILD__: JSON.stringify( isProduction ),
	} ),
	new HtmlWebpackPlugin( {
		chunks: ['main'],
		template: 'src/index.html',
	} ),
];

const config: webpack.Configuration = {
	mode: isProduction ? 'production' : 'development',
	entry: './src/app.ts',
	devtool: isProduction ? false : 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {},
			},
			{
				test: /\.(glb|ktx2?|dds|bin|mp3)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(wat)$/i,
				type: 'asset/source',
			},
			{
				test: /\.hlsl?$/,
				loader: '@gdgt/hlsl-loader',
				options: {
					logGlsl: true,
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [path.resolve( __dirname, './src' ), 'node_modules'],
		fallback: { path: false, fs: false },
	},
	output: {
		path: path.resolve( __dirname, './dist' ),
		filename: isProduction ? '[contenthash:6].js' : '[name].bundle.js',
		chunkFilename: isProduction ? '[id].[contenthash:6].js' : '[id].chunk.js',
		assetModuleFilename: isProduction ? '[hash:8][ext]' : '[name].[hash:8][ext]',
		chunkLoadingGlobal: isProduction ? '_c' : 'webpackChunk',
	},
	performance: {
		hints: false,
	},
	plugins,
	experiments: {
		asyncWebAssembly: true,
		syncWebAssembly: true,
	},
	devServer: {
		hot: !isProduction,
		compress: true,
		host: '0.0.0.0',
		allowedHosts: 'all',
		port: 3000,
		historyApiFallback: true,
		server: 'http',
		headers: {
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Cross-Origin-Embedder-Policy': 'require-corp',
		},
		static: ['public'],
	},
};

export default config;
