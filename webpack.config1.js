const webpack = require('webpack');
const path = require('path');

var config = {
    devtool: 'eval',
   entry: path.join(__dirname, 'main.js'),
	
   output: {
      path:path.join(__dirname, './'),
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 80
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude:/node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;