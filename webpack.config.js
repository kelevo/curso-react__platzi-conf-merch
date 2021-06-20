// generamos constante para usar path que esta dentro de los recursos de node
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    // path .resolve() nos permite saber donde estamos en nuestro sistema de archivos
    // __dirname nos da el nombre de la ruta mas el nombre de la carpeta
    path: path.resolve(__dirname, 'dist'),
    // es el nomnbre resultante del archivo final que estara dentro de "dist"
    filename: 'bundle.js',
    publicPath: '/',
  },
  // resolve de las exenciones que usaremos
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // modulo que contiene reglas y demas para el proyecto
  module: {
    // una por cada tecnologia, js, html, etc
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3005,
    open: true,
  },
};
