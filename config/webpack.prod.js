/* eslint import/no-extraneous-dependencies: 0, global-require: 0, prefer-template: 0 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENV = 'production';

const getConfig = require('./webpack.common.js');

const ASSETS_PATH = './assets/';

const JS_FOLDER = ASSETS_PATH + 'js/';
const IMG_FOLDER = ASSETS_PATH + 'images/';
const FONTS_FOLDER = ASSETS_PATH + 'fonts/';
const CSS_FOLDER = ASSETS_PATH + 'css/';

const commonConfig = getConfig({
    env: ENV,
    js_folder: JS_FOLDER,
    img_folder: IMG_FOLDER,
    fonts_folder: FONTS_FOLDER,
    css_folder: CSS_FOLDER,
});

const config = webpackMerge.smart(commonConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.p?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../',
                        }
                    },
                    'css-loader', 'postcss-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                            svgo: {
                                plugins: [
                                    { removeViewBox: false },
                                    { removeEmptyAttrs: false }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                use: {
                    loader: 'pug-loader',
                    options: {
                        pretty: true
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: CSS_FOLDER + '[name].css'})
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_console: false,
                    }
                }
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    autoprefixer: { disable: true } },
                canPrint: true
            })
        ]
      }
});

module.exports = config;
