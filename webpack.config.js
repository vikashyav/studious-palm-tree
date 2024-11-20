const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundled-client.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'], // Process CSS files
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Directory to serve static files
    },
    compress: true, // Enable gzip compression
    port: 9000, // Port to run the server
    hot: true, // Enable hot module replacement
    open: true, // Automatically open the browser
    historyApiFallback: true, // Handle routing for single-page apps
  },
};

