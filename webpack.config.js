var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var root = path.join.bind(path, ROOT);


module.exports = [
    {
        entry: {
            'polyfills': './app/misc/polyfills.browser',
            'vendor': './app/misc/vendor',
            'main': './app/main'
        },
        output: {
            path: __dirname + '/dist',
            publicPath: '/',
            filename: '[name].[hash].js',
            chunkFilename: '[id].[hash].chunk.js'
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss']
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [{
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.json'
                        }
                    }, 'angular2-template-loader']
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file-loader?name=assets/[name].[hash].[ext]'
                },
                {
                    test: /\.scss$/,
                    exclude: [__dirname + '/app/styles'],
                    loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: 'style-loader',
                        loader: 'css-loader!sass-loader',
                    }),
                    include: [__dirname + '/app/styles']

                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'ENVIRONMENT': JSON.stringify(process.env.NODE_ENV || 'development')
            }),
            new ExtractTextPlugin('[name].[hash].css'),
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                __dirname
            ),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['main', 'polyfills']
            }),
            new HtmlWebpackPlugin({
                title: 'linotte-backoffice',
                template: './app/index.ejs'
            }),
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                jquery: 'jquery'
            })
        ]
    }
];
