"use strict";
var path = require("path"),
    webpack = require("webpack"),
<<<<<<< HEAD
    watchFolderPlugin = require("./watchFolderPlugin.js"),
    hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

=======
    hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


>>>>>>> 87a2fb157dca77621d3edf69470b79441063f4c4
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
<<<<<<< HEAD
        new webpack.NoErrorsPlugin(),
        new watchFolderPlugin({watchFolder: "/src/components/"})
=======
        new webpack.NoErrorsPlugin()
>>>>>>> 87a2fb157dca77621d3edf69470b79441063f4c4
    ],
    externals: {

    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ajs', '.html']
    }
};