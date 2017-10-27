
if (process.env.WEBPACK_TARGET === 'examples') {
  console.log('Building examples')
  module.exports = require('./webpack/examples.config')
} else {
  console.log('Building library')
  module.exports = require('./webpack/lib.config')
}