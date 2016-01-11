"use strict";
var path = require("path"),
    webpack = require("webpack"),
    watchFilePlugin = require("watchfile-webpack-plugin"),
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
            loaders: ["node-async-require-loader?preParser=multipleRts&async=true&queryString='current_page=/page/top/test4/'"]
            // loaders: ["node-async-require-loader?preParser=rt&async=false"]
        }, {
            test: /\.jsx$/,
            loaders: ["jsx-loader?insertPragma=React.DOM&harmony"]
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new watchFilePlugin({watchFolder: "./src/components/", watchExtension: "rt"})
    ],
    externals: {

    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ajs', '.html']
    }
};