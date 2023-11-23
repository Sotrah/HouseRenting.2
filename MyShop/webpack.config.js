"use strict";
var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require("webpack-notifier");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    entry: ['babel-polyfill', "./React/src/index.js"],
    output: {
        path: path.resolve(__dirname, "./wwwroot/lib/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Caching'
        }),
        new WebpackNotifierPlugin(),
        new BrowserSyncPlugin()
    ],
    devtool: "inline-source-map",
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};
