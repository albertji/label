const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {

    /*入口*/
    entry: [
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.js')
    ],

    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        //path: 'C:\\wamp64\\www',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html')
    }),
        //new UglifyJSPlugin()
    ],
    devServer: {
        port: 1234,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        proxy:{
            '/datasys/*': {
                target: 'http://10.19.19.23:8091'
            }
        }
    },
    devtool: 'inline-source-map',

};
