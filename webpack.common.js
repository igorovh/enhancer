const path = require('path');
const { glob } = require('glob');

const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        inject: './src/inject.js',
        index: './src/index.js',
        bundle: [
            ...glob.sync('./src/modules/**/index.@(css|scss)').filter((path) => !path.includes('.module.')),
            ...glob.sync('./src/utils/**/index.@(css|scss)').filter((path) => !path.includes('.module.')),
        ],
        content: [...glob.sync('./src/content/*.js')],
        worker: [...glob.sync('./src/worker/*.js')],
    },
    resolve: {
        alias: {
            $Modules: path.resolve(__dirname, 'src/modules'),
            $Utils: path.resolve(__dirname, 'src/utils'),
            $Logger: path.resolve(__dirname, 'src/common/logger.js'),
            $Peeker: path.resolve(__dirname, 'src/common/peeker.js'),
            $Settings: path.resolve(__dirname, 'src/common/settings.js'),
        },
        extensions: ['.js', '.jsx'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'webpack-glob-loader',
                exclude: /node_modules/,
                enforce: 'pre',
            },
            {
                test: /\.(js|jsx)?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new ESLintPlugin({
            extensions: ['js', 'jsx'],
            overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyPlugin({
            patterns: [{ from: 'public' }],
        }),
    ],
};
