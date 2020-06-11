'use strict';

const CleanWebpackPlugin        = require('clean-webpack-plugin');
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const ContextReplacementPlugin  = require('webpack/lib/ContextReplacementPlugin');

const helpers                   = require('./webpack.config.helpers');
const isDev                     = (process.env.NODE_ENV || 'development').trim() == 'development';

module.exports = {
    entry: {
        vendor: './src/vendor.ts',
        polyfills: './src/polyfills.ts',
        main: isDev ? './src/main.ts' : './src/main.env.ts'
    },
    resolve: {
        extensions: ['.ts', '.js', '.scss', '.css']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: isDev } },
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: helpers.root('src', 'assets')
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'to-string-loader',
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: helpers.root('src', 'app')
            },
            { 
                test: /\.css$/, 
                loaders: ['to-string-loader', 'css-loader'] 
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            helpers.root('dist'), { root: helpers.root(), verbose: true }
        ),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new ContextReplacementPlugin(
			/\@angular(\\|\/)core(\\|\/)fesm5/,
			helpers.root('src')
        ),
        new ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            helpers.root('src')
        )
    ]
};