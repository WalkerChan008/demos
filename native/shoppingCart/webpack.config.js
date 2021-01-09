var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});

module.exports = {
    entry: {
        index: './src/js/index.js',
        goodsInfo: './src/js/goodsInfo.js'
    },

    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:8080/dist'
    },

    devServer: {
        historyApiFallback:true,
        inline:true,
        progress:true,
        port:8080 //端口你可以自定义
    },

    module: {
        rules: [
            {test: /.(jpg|png|gif)$/, use: ['url-loader?limit=20&name=/[name].[ext]']},
            {test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            // {
            //     test: /.css$/,
            //     use: ExtractTextPlugin.extract({
            //       fallback: "style-loader",
            //       use: "css-loader"
            //     })
            // },
        ]
    },

    mode: 'development',

    plugins: [
        new UglifyJSPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'commons',
        //     filename: 'commons.js',
        //     chunks: 2
        // }),
        // new ExtractTextPlugin("[name].css"), 
        providePlugin
    ]
}