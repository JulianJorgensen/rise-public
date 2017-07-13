import webpack from 'webpack';
import path from 'path';
import Merge from 'webpack-merge';
import StatsPlugin from 'stats-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import PostCSS from './postcss.config';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const extractFonts = new ExtractTextPlugin('fonts.css');

// define environment constants
const NODE_ENV = (process.env.NODE_ENV || 'development');
const IS_PRODUCTION = (NODE_ENV === 'production');

// Static vendor assets for which one can expect
//  minimal and a slow rate of change:
const VENDOR_LIBS = [
  'react',
  'react-dom',
  'react-redux'
];


// Webpack config for both production and development environments
// ====================
const BASE_CONFIG = {
  entry: {
    bundle: path.resolve(__dirname, 'app/main'),
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /fonts/,
        use: ExtractTextPlugin.extract({
          fallback: {loader: 'style-loader'},
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                minimize: true,
                importLoaders: 1,
                localIdentName: "[name]--[local]--[hash:base64:8]"
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /fonts\.css/,
        use: extractFonts.extract({
          use: 'css-loader',
        }),
      },
      {
        test: /\.(woff|woff2)$/,
        use: 'url-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        context: 'app',
        from: 'assets'
      }
    ]),
    new webpack.DefinePlugin({
      // Dynamically access local environment variables based on the environment
      'ENV_CONFIG': JSON.stringify(require('./config/' + NODE_ENV + '.config'))
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HTMLWebpackPlugin({
      template: 'app/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    extractFonts
  ],
  devtool: `${IS_PRODUCTION ? 'inline' : 'cheap-eval'}-source-map`,
  resolve: {
    modules: [
      'node_modules',
      './app',
      './app/router',
      './app/components',
      './app/vendor',
      './app/api',
      './app/utils'
    ],
    alias: {
      app: 'app',
      router: 'router/router.jsx',
      invoiceActions: 'actions/invoiceActions.jsx',
      reducers: 'reducers/reducers.jsx',
      configureStore: 'store/configureStore.jsx'
    },
    extensions: ['.js', '.jsx', '.css']
  }
};


// Webpack plugins unique to the production build:
const PROD_PLUGINS = [
  new ExtractTextPlugin('[name].min.[contenthash].css'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false
    },
    output: {
      comments: false
    }
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new StatsPlugin('stats.json', {
    chunkModules: true
  })
];

// Webpack field-value pairs re: webpack-dev-server:
const PROD_CONFIG = {
  output: {
    filename: '[name].min.[hash].js'
  }
};



// Webpack plugins unique to the development build:
const DEV_PLUGINS = [
  new ExtractTextPlugin('[name].[contenthash].css'),
  new webpack.HotModuleReplacementPlugin(),
  new StatsPlugin('stats.json', {
    chunkModules: true
  })
];

// Webpack field-value pairs re: webpack-dev-server:
const DEV_CONFIG = {
  output: {
    filename: '[name].[hash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    open: true,
    host: 'localhost',
    hot: true,
    inline: true,
    noInfo: false,
    port: 3000,
    historyApiFallback: true
  }
};

// Final Webpack configuration object constructed
//  conditionally according to the NODE_ENV value:
const AGGREGATE_CONFIG = IS_PRODUCTION
  ? Merge(BASE_CONFIG, PROD_CONFIG, { plugins: PROD_PLUGINS })
  : Merge(BASE_CONFIG, DEV_CONFIG, { plugins: DEV_PLUGINS });

export default AGGREGATE_CONFIG;
