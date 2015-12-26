"use strict";
var path = require("path"),
    webpack = require("webpack");

module.exports = {
    cache: true,
    entry: {
        index: "./src/index.jsx"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?preParser=rt"
        }, {
            test: /\.jsx$/,
            loader: "jsx-loader?insertPragma=React.DOM&harmony"
        }]
    },
    plugins: [


    ],
    externals: {

    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};