var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (ctx) {

    var cssFilenameSuffix = (ctx !== 'production' ? 'examples' : 'min')
    var extractCSS = new ExtractTextPlugin(`[name]-${cssFilenameSuffix}.css`) 
    var conf = {
        context: __dirname + '/..',
    
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        },
    
        plugins: [
            extractCSS
        ]
    }

    // if (ctx !== 'production')
        conf.devtool = 'source-map'

    conf.module.loaders.push({
        test: /\.css$/,
        // loader: 'css-loader'
        loader: extractCSS.extract({
            use: 'css-loader' + (ctx !== 'production' ? '?sourceMap' : ''),
        })
    });

    return conf

}