import webpack from 'webpack';
import "babel-polyfill";
import path from 'path';
import Merge from 'webpack-merge';
import StatsPlugin from 'stats-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import PostCSS from './postcss.config';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
// import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';

// define environment constants
const NODE_ENV = (process.env.NODE_ENV || 'development');
const IS_PRODUCTION = (NODE_ENV === 'production' && NODE_ENV === 'staging');

console.log('Running webpack optimized for', NODE_ENV);

// Static vendor assets for which one can expect
//  minimal and a slow rate of change:
const VENDOR_LIBS = [
  'react',
  'react-dom',
  'react-router-dom',
  'react-redux',
  'react-redux-firebase',
  'react-toolbox'
];

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app/app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'public');

// Webpack config for both production and development environments
// ====================
const BASE_CONFIG = {
  entry: {
    bundle: ['babel-polyfill', 'whatwg-fetch', APP_PATH],
    vendor: VENDOR_LIBS
  },
  output: {
    path: BUILD_PATH,
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
        test: /\.(gif|png|jpg|jpe?g)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-80',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
          test: /\.svg$/,
          exclude: /node_modules/,
          loader: 'svg-react-loader',
          query: {
            classIdPrefix: '[name]-[hash:8]__'
          }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        context: 'app',
        from: 'assets/pdfs',
        to: 'pdfs'
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
    new HTMLWebpackPlugin({
      template: 'app/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // reduce moment package size
    // new SpriteLoaderPlugin()
  ],
  devtool: `${IS_PRODUCTION ? 'inline' : 'cheap-eval'}-source-map`,
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'app/assets/'),
      images: path.resolve(__dirname, 'app/assets/images/'),
      app: path.resolve(__dirname, 'app/'),
      components: path.resolve(__dirname, 'app/components/'),
      containers: path.resolve(__dirname, 'app/containers/'),
      routes: path.resolve(__dirname, 'app/routes/'),
      store: path.resolve(__dirname, 'app/store/'),
      styles: path.resolve(__dirname, 'app/styles/'),
      utils: path.resolve(__dirname, 'app/utils/')
    },
    extensions: ['.js', '.jsx', '.css']
  }
};


// Webpack plugins unique to the production build:
const PROD_PLUGINS = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
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
