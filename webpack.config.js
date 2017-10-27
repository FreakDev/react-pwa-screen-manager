
var sourcePathConfig = {}

if (process.env.WEBPACK_TARGET !== 'examples') {
  sourcePathConfig = {
    entry: './src/lib',
    output: {
      path: __dirname + '/build/lib',
      filename: 'index.js'
    }
  }
} else {
  sourcePathConfig = {
    entry: './src/examples',
    output: {
      path: __dirname + '/build/examples',
      filename: 'index.js'
    }
  }  
}

module.exports = Object.assign(sourcePathConfig, {
  context: __dirname,
  
  devtool: 'source-map',

  module: {
    loaders: [{
        test: /\.css$/,
        loader: 'css-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  
  plugins: [
  ]
})