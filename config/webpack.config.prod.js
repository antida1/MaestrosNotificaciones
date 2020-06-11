'use strict';

const webpack                 = require('webpack');
const webpackMerge            = require('webpack-merge');
const UglifyJsPlugin          = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano                 = require('cssnano');
const JavaScriptObfuscator    = require('webpack-obfuscator');

const commonConfig            = require('./webpack.config.common');
const helpers                 = require('./webpack.config.helpers');
const constants               = require('./constants.prod.json');

module.exports = webpackMerge(commonConfig, {
    mode: 'production',
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        library: 'hermexApp',
        libraryTarget: 'window'
    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: [
            helpers.root('node_modules')
        ]
    },
    optimization: {
        noEmitOnErrors: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: false
            })
        ]
    },
    devServer: {
        historyApiFallback: {
            disableDotRule: true
        }
    },
    plugins: [
        new JavaScriptObfuscator ({
          rotateUnicodeArray: true
        }),
        new webpack.DefinePlugin({
            ENV: JSON.stringify('PROD'),
            URL_BASE_API_HISTORIAL_NOTIFICACIONES_W: JSON.stringify(constants.URL_BASE_API_HISTORIAL_NOTIFICACIONES_W),
            URL_BASE_API_REENVIO_NOTIFICACIONES_W: JSON.stringify(constants.URL_BASE_API_REENVIO_NOTIFICACIONES_W),
            URL_BASE_API_NOTIFICACIONES_W: JSON.stringify(constants.URL_BASE_API_NOTIFICACIONES_W)   
        })
    ],
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|webp|gif|otf|ttf|woff2?|ani)$/,
                loader: "url-loader",
                options: {
                    name: "fonts/[name].[ext]",
                    publicPath: function(url) {
                        return url.replace(/fonts/, '..');
                    }
                }
            },
            {
                test: /\.(eot|svg|cur)$/,
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]",
                    publicPath: function(url) {
                        return url.replace(/fonts/, '..')
                    }
                }
            },
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: helpers.root('tsconfig.env.json')
                        }
                    },
                    'angular2-template-loader',
                    'angular-router-loader'
                ],
                exclude: [/node_modules/]
            }
        ]
    }
});