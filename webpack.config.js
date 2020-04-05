const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index:  './src/index.js',
        another: './src/another-module.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ],
        }, ],
    },
    optimization: {
        splitChunks: {
            filename: 'Chunks.js',
            chunks: 'all',
        },
    },
};