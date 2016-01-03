"use strict";
var path = require("path"),
    webpack = require("webpack"),
    hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


module.exports = {
    cache: true,
    entry: {
        index: ["./src/index.jsx", hotMiddlewareScript]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.ajs$/,
            loaders: ["node-async-require-loader?preParser=rt&async=false"]
        }, {
            test: /\.jsx$/,
            loaders: ["jsx-loader?insertPragma=React.DOM&harmony"]
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    externals: {

    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ajs', '.html']
    }
};