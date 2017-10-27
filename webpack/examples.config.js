
var baseConfig = require('./base.config')('examples')

module.exports = Object.assign({
    entry: {
        'react-pwa-screen-manager': './src/examples/index.js'
    },
    output: {
      path: baseConfig.context + '/dist/examples',
      filename: '[name]-examples.js',
    }
}, baseConfig)