const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = process.env.NODE_ENV || 'development';
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	MODE,
	isDevelopment,
	isProduction,
	isHmrEnabled: Boolean(process.env.HRM),

	// style files regexes
	cssRegex: /\.css$/,
	cssModuleRegex: /\.module\.css$/,
	sassRegex: /\.(scss|sass)$/,
	sassModuleRegex: /\.module\.(scss|sass)$/,

	imageInlineSizeLimit: parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'),

	// common function to get style loaders
	getStyleLoaders(cssOptions, preProcessor) {
		const loaders = [
			isDevelopment && require.resolve('style-loader'),
			isProduction && {
				loader: MiniCssExtractPlugin.loader
			},
			{
				loader: require.resolve('css-loader'),
				options: cssOptions,
			},
			{
				loader: 'postcss-loader',
				options: {
					postcssOptions: {
						ident: 'postcss',
						plugins: [
							require('postcss-flexbugs-fixes'),
							require('postcss-preset-env')({
								autoprefixer: {
									flexbox: 'no-2009',
								},
								stage: 3,
							})
						],
					},
					sourceMap: isDevelopment,
				},
			},
		].filter(Boolean);
		if (preProcessor) {
			loaders.push(
				{
					loader: 'resolve-url-loader',
					options: {
						sourceMap: isDevelopment,
					},
				},
				{
					loader: preProcessor,
					options: {
						sourceMap: isDevelopment,
					},
				}
			);
		}
		return loaders;
	}
};
