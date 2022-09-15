const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const htmlPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

module.exports = {
    entry: path.resolve(__dirname, "./src/index.jsx"),
    mode: "development",
    resolve: {
        extensions: [".js", ".jsx", ".css"],
        fallback: {
            os: require.resolve("os-browserify"),
            https: require.resolve("https-browserify"),
            http: require.resolve("stream-http"),
            stream: require.resolve("stream-browserify"),
            util: require.resolve("util/"),
            url: require.resolve("url/"),
            assert: require.resolve("assert/"),
            crypto: require.resolve("crypto-browserify"),
            buffer: require.resolve('buffer/')
        }
    },
    module: {
        rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader", options: { modules: true } }
            ]
        },
        {
            test: /\.svg?$/,
            use: {
                loader: "svg-url-loader"
            }
        },
        {
            test: /\.m?js/,
            resolve: {
                fullySpecified: false
            }
        },
        {
            test: /\.png/,
            type: 'asset/resource'
        }
        ]
    },
    plugins: [
        htmlPlugin,
        new webpack.ProvidePlugin({
            Buffer: [require.resolve("buffer/"), "Buffer"],
            process: "process/browser",
            "React": 'react'
        })
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true
    }
}