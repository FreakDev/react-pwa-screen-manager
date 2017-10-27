
var baseConfig = require('./base.config')('production')

module.exports = Object.assign({
    entry: {
        'react-pwa-screen-manager': './src/lib/index.js'
    },
    output: {
        path: baseConfig.context + '/dist/lib',
        filename: '[name].min.js',
        library: 'ReactBootstrap',
        libraryTarget: 'umd',
    },

    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
            },
        },
        {
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom',
            },
        }, 
        {
            "react-router-dom": {
                root: 'ReactRouterDom',
                commonjs2: 'react-router-dom',
                commonjs: 'react-router-dom',
                amd: 'react-router-dom',
            },
        },
        {
            "react-transition-group": {
                root: 'ReactTransitionGroup',
                commonjs2: 'react-transition-group',
                commonjs: 'react-transition-group',
                amd: 'react-transition-group',
            }     
        }
    ]
}, baseConfig) 
