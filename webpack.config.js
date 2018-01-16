const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/App.tsx',
  output: {
    path: path.resolve(__dirname) + '/dist',
    filename: 'crate.min.js',
    publicPath: '/'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  plugins: process.argv[1].indexOf('webpack-dev-server') !== -1 ? [
    /**
     * Development
     */

  ] : [
    /**
     * Production
     */
    new UglifyJsPlugin()
  ],

  devServer: {
    contentBase: './dist/',
    hot: true
  }
}
