const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { DefinePlugin } = require('webpack');
require('dotenv').config();

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const PUBLIC_URL = process.env.PUBLIC_URL || '';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      clean: true,
      publicPath: '/',
      assetModuleFilename: 'asset/[name].[hash][ext]',
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    stats: {
      colors: true,
      errorDetails: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      assets: true,
      entrypoints: false,
      warnings: true,
      errors: true,
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 3000,
      host: '0.0.0.0',
      static: [
        {
          directory: path.join(__dirname, 'public'),
          publicPath: '/',
        },
        {
          directory: path.join(__dirname, 'src/asset'),
          publicPath: '/assets',
        },
      ],
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
        logging: 'error',
        progress: true,
      },
      devMiddleware: {
        writeToDisk: true,
      },
      onListening: function (devServer) {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        const addr = devServer.server.address();
        console.clear();
        console.log('\n🚀 Development server running at:');
        console.log(`   Local:   http://localhost:${addr.port}/`);
        console.log(`   Network: http://${require('ip').address()}:${addr.port}/\n`);
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.module\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isProduction
                    ? '[hash:base64]'
                    : '[name]__[local]--[hash:base64:5]',
                },
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]',
          },
        },
        {
          test: /\.svg$/i,
          type: 'asset/inline',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fontz/[name].[hash][ext]',
          },
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProduction ? 'production' : 'development'
        ),
        'process.env.PUBLIC_URL': JSON.stringify(PUBLIC_URL),
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        inject: true,
        templateParameters: {
          PUBLIC_URL: PUBLIC_URL,
        },
      }),
      new MiniCssExtractPlugin({
        filename: isProduction
          ? 'css/[name].[contenthash].css'
          : 'css/[name].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '',
            globOptions: {
              ignore: ['**/index.html', '**/favicon.ico'],
            },
          },
          {
            from: path.resolve(__dirname, 'src/asset'),
            to: path.resolve(__dirname, 'dist/assets'),
          },
        ],
      }),
    ],
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/Pages'),
        '@assets': path.resolve(__dirname, 'src/asset'),
        '@css': path.resolve(__dirname, 'src/css'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@services': path.resolve(__dirname, 'src/services'),
      },
    },
  };
};
