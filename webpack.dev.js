const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 2565,
        allowedHosts: ['127.0.0.1', '.twitch.tv'],
        static: './build',
        client: {
            webSocketURL: {
                hostname: '127.0.0.1',
                protocol: 'ws',
            },
        },
    },
});
