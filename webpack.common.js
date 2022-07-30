const path = require('path');
const { glob } = require('glob');

const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        bundle: [
            ...glob.sync('./src/modules/**/index.css')
        ]
    },
    resolve: {
        alias: {
            $Modules: path.resolve(__dirname, 'src/modules'),
            $Utils: path.resolve(__dirname, 'src/utils'),
            $Logger: path.resolve(__dirname, 'src/logger.js'),
            $Peeker: path.resolve(__dirname, 'src/peeker.js')
        },
        extensions: ['.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'webpack-glob-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            },
            {
                test: /\.(js|jsx)x?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        new ESLintPlugin({
            extensions: ['js'],
            overrideConfigFile: path.resolve(__dirname, '.eslintrc')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CopyPlugin({
            patterns: [{ from: 'public' }],
        }),
    ]
}