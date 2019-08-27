/* eslint import/no-extraneous-dependencies: 0, global-require: 0, prefer-template: 0 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helpers = require('./helpers');
const pages = require('../config/pages');

const webpackConfig = function (options) {
    const env = options.env;

    const js_folder = options.js_folder || 'js/';
    const img_folder = options.img_folder || 'images/';
    const fonts_folder = options.fonts_folder || 'fonts/';

    const is_prod = env === 'prod' || env === 'production';

    return {
        entry: {
            polyfills: [helpers.root('src', 'js', 'polyfills.js')],
            app: [helpers.root('src', 'js', 'index.js')]
        },
        output: {
            path: helpers.root('build'),
            publicPath: is_prod ? '' : '/',
            filename: js_folder + '[name].js'
        },
        resolve: {
            extensions: ['.js', '.json'],
            modules: [
                helpers.root('src'),
                helpers.root('node_modules')
            ]
        },
        module: {
            rules: [
                // scripts
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: { cacheDirectory: true }
                    }
                },
                // handlebars
                {
                    test: /\.handlebars$/,
                    use: {
                            loader: "handlebars-loader"
                        }
                },
                // styles
                {
                    test: /\.p?css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                },
                // images
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: { name: img_folder + '[name].[ext]' }
                    }
                },
                // pug templates
                {
                    test: /\.pug$/,
                    use: {
                        loader: 'pug-loader'
                    }
                },
                // fonts
                {
                    test: /\.(eot)$/,
                    use: {
                        loader: 'file-loader',
                        options: { mimetype: 'application/vnd.ms-fontobject', name: fonts_folder + '[name].[ext]' }
                    }
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: {
                        loader: 'file-loader',
                        options: { mimetype: 'application/font-woff', name: fonts_folder + '[name].[ext]' }
                    }
                },
                {
                    test: /\.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: {
                        loader: 'file-loader',
                        options: { mimetype: 'application/octet-stream', name: fonts_folder + '[name].[ext]' }
                    }
                }
            ]
        },
        plugins: [
            ...pages.map(page => new HtmlWebpackPlugin(page)),
            new CopyWebpackPlugin([
                {
                    from: helpers.root('src', 'static'),
                    to: helpers.root('build', 'static')
                }
            ])
        ]
    };
};

module.exports = webpackConfig;
