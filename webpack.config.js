const path = require('path');
const webpack = require('webpack');
// const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const buildConfig = require('./build-config');

module.exports = {
  mode: buildConfig.MODE,

  context: path.resolve(__dirname, 'src'),

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/app.js',
    publicPath: '/'
  },

  target: 'web',

  module: {
    rules: [
      //JS
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              compact: buildConfig.isProduction,
            },
          }
        ]
      },

      //styles
      {
        test: buildConfig.cssRegex,
        exclude: buildConfig.cssModuleRegex,
        use: buildConfig.getStyleLoaders({
          importLoaders: 1,
          sourceMap: buildConfig.isDevelopment,
        }),
      },
      {
        test: buildConfig.cssModuleRegex,
        use: buildConfig.getStyleLoaders({
          importLoaders: 1,
          sourceMap: buildConfig.isDevelopment,
          modules: {
            localIdentName: '[local]_[hash:base64:6]'
          },
        }),
      },
      {
        test: buildConfig.sassRegex,
        exclude: buildConfig.sassModuleRegex,
        use: buildConfig.getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: buildConfig.isDevelopment,
          },
          'sass-loader'
        ),
      },
      {
        test: buildConfig.sassModuleRegex,
        use: buildConfig.getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: buildConfig.isDevelopment,
            modules: {
              exportLocalsConvention: 'dashesOnly',
              localIdentName: '[local]_[hash:base64:6]'
            },
          },
          'sass-loader'
        ),
      },

      //images
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: buildConfig.imageInlineSizeLimit,
          name: 'images/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
              name: 'images/[hash:8].[ext]',
            },
          }
        ],
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', 'src'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
    }
  },

  optimization: buildConfig.isProduction ? {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        extractComments: false,
        sourceMap: false,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    nodeEnv: buildConfig.MODE,
    sideEffects: true,
    concatenateModules: true,
  } : {},

  devServer: buildConfig.isDevelopment ? {
    contentBase: path.resolve(__dirname, 'public'),
    hot: buildConfig.isDevelopment && buildConfig.isHmrEnabled,
    host: 'localhost',
    port: 3000,
    disableHostCheck: true,
    historyApiFallback: true,
    writeToDisk: false,
    stats: 'errors-only',
  } : {},

  devtool: buildConfig.isDevelopment ? 'cheap-module-source-map' : false,

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: buildConfig.MODE,
    }),
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'TODO App',
      inject: true,
    }),
    // new ErrorOverlayPlugin(),
    buildConfig.isDevelopment && buildConfig.isHmrEnabled && new ReactRefreshWebpackPlugin(),
    buildConfig.isDevelopment && new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
    buildConfig.isProduction && new MiniCssExtractPlugin({
      filename: 'css/app.css',
    }),
  ].filter(Boolean)
};
