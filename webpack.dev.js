const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devServer: {
        contentBase: './dist',
    },
    mode: 'development',
    devtool: 'inline-source-map',
});