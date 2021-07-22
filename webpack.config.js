const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV === 'development';
const devProd = !devMode;

module.exports = {
  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
  entry: {
    main: path.resolve(__dirname, './src/pages/index.ts')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: devMode ? "[name].js" : "[name].[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.sass'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/layouts/index.html',
      minify: {
        collapseWhitespace: devProd,
      }
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: devMode,
  },
  module: {
    rules: [
      {
        test: /\.m?ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      }
    ],
  },
}
