const webpack = require('webpack');
const path = require('path');

const nodeExternals = require('webpack-node-externals');

/**
 * Getter for webpack config for all the different kind of builds there is in this repo
 * @param  {Object} options        Passed from building, starting and testing the application
 * @return {Object}                Webpack config object
 */
module.exports = ({
  bail = true,
} = {}) => {
  const rootPath = path.resolve(__dirname, '..');
  const propTypesPlugin = [
    [
      'transform-react-remove-prop-types',
      {
        /*
    If npm build, wrap the the propTypes, if not, just remove them
    Component.propTypes = process.env.NODE_ENV !== "production" ? {
      // ...
    } : {};
      */
        mode: 'wrap',
        ignoreFilenames: ['node_modules'],
      },
    ],
  ];

  return ({
    bail,
    devtool: 'source-map',
    entry: {
      index: path.resolve(rootPath, 'src', 'index'),
    },
    output: {
      path: path.resolve(rootPath, 'lib'),
      filename: '[name].js',
      libraryTarget: 'umd',
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: 'process.env !== \'production\'',
      }),
    ],
    module: {
      rules: []
        .concat([
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015', 'stage-2'],
                  plugins: ['transform-runtime', 'transform-decorators-legacy'],
                },
              },
            ],
          },
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015', 'stage-2', 'react'],
                  plugins: ['transform-runtime', 'transform-decorators-legacy']
                    .concat(propTypesPlugin),
                },
              },
            ],
          },
        ]),
    },
    resolve: {
      extensions: []
        .concat(['.js', 'jsx']),
      modules: [
        rootPath,
        path.join(rootPath, 'node_modules'),
      ],
    },
    externals: []
      .concat(nodeExternals({
        modulesDir: path.join(rootPath, 'node_modules'),
      })),
  });
};
