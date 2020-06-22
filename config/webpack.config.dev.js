'use strict';

const webpack      = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
const helpers      = require('./webpack.config.helpers');
const constants    = require('./constants.dev.json');

module.exports = webpackMerge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    optimization: {
        noEmitOnErrors: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: helpers.root('tsconfig.json')
                        }
                    },
                    'angular2-template-loader',
                    'angular-router-loader'
                ],
                exclude: [/node_modules/]
            },
            {
                test: /\.(ttf|eot|svg|gif|woff2|png|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    },
    devServer: {
        historyApiFallback: {
            disableDotRule: true
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('DEV'),
            URL_BASE_API_HISTORIAL_NOTIFICACIONES_W: JSON.stringify(constants.URL_BASE_API_HISTORIAL_NOTIFICACIONES_W),
            URL_BASE_API_REENVIO_NOTIFICACIONES_W: JSON.stringify(constants.URL_BASE_API_REENVIO_NOTIFICACIONES_W),
            URL_BASE_API_NOTIFICACIONES_W: JSON.stringify(constants.URL_BASE_API_NOTIFICACIONES_W),
            URL_BASE_API_MASTER_TYPELIST_W: JSON.stringify(constants.URL_BASE_API_MASTER_TYPELIST_W) 
        })
    ]
});