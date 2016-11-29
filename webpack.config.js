/**
 * This file is part of the noggin package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// Helper: root(), and rootDir() are defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {};

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    // add debug messages
    config.debug = !isProd || !isTest;

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    config.entry = isTest ? {} : {
        'vendor': './src/vendor.js',
        'app': './src/main.js'
    };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = isTest ? {} : {
        path: root('dist'),
        publicPath: isProd ? '/' : 'http://localhost:8080/',
        filename: 'js/[name].js',
        chunkFilename: '[id].chunk.js'
    };

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        cache: !isTest,
        root: root(),
        extensions: ['', '.js', '.json', '.css', '.scss', '.html'],
        alias: {
            'app': 'src/app',
            'common': 'src/common'
        }
    };

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        loaders: [
            // Support for .js files.
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [isTest ? /\.(e2e)\.js$/ : /\.(spec|e2e)\.js$/, /node_modules\/(?!(ng2-.+))/]
            },
            // copy those assets to output
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file?name=fonts/[name].[hash].[ext]?'
            },
            // Support for *.json files.
            {test: /\.json$/, loader: 'json'},
            // Support for CSS as raw text
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.css$/,
                exclude: root('src', 'app'),
                loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
            },
            // all css required in src/app files will be merged in js files
            {test: /\.css$/, include: root('src', 'app'), loader: 'raw!postcss'},
            // support for .scss files
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.scss$/,
                exclude: root('src', 'app'),
                loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
            },
            // all css required in src/app files will be merged in js files
            {test: /\.scss$/, exclude: root('src', 'style'), loader: 'raw!postcss!sass'},
            // support for .html as raw text
            {test: /\.html$/, loader: 'raw'},
            {test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery'}
        ],
        postLoaders: []
    };

    if (isTest) {
        // instrument only testing sources with Istanbul, covers js files
        config.module.postLoaders.push({
            test: /\.js$/,
            include: path.resolve('src'),
            loader: 'babel-istanbul',
            exclude: [/\.spec\.js$/, /\.e2e\.js$/, /node_modules/]
        });
    }

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        // Define env variables to help with builds
        // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({
            'process.env': {
                // Environment helpers
                ENV: JSON.stringify(ENV)
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ];

    if (!isTest) {
        config.plugins.push(
            // Generate common chunks if necessary
            // Reference: https://webpack.github.io/docs/code-splitting.html
            // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
            new CommonsChunkPlugin({
                name: ['vendor']
            }),
            // Inject script and link tags into html files
            // Reference: https://github.com/ampedandwired/html-webpack-plugin
            new HtmlWebpackPlugin({
                template: './src/public/index.html',
                chunksSortMode: 'dependency'
            }),
            // Extract css files
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Disabled when in test mode or not in build mode
            new ExtractTextPlugin('css/[name].[hash].css', {disable: !isProd})
        );
    }

    if (isProd) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            // new webpack.optimize.UglifyJsPlugin({mangle: {keep_fnames: true}}),
            // Copy assets from the public folder
            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: root('src/public')
            }])
        );
    }

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    /**
     * Sass
     * Reference: https://github.com/jtangelder/sass-loader
     * Transforms .scss files to .css
     */
    config.sassLoader = {};

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './src/public',
        historyApiFallback: true,
        stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
    };

    return config;
}();

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
