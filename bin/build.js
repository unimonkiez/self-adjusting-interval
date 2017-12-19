const webpack = require('webpack');
const getWebpackConfig = require('./get-webpack-config');

const args = process.argv.slice(2);
const isWatching = args.indexOf('-w') !== -1;

const webpackConfig = getWebpackConfig({
  bail: !isWatching,
});

const cb = (err, stats) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    if (!isWatching) {
      process.exit(1);
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('[webpack log]', stats.toString());
  }
};
if (isWatching) {
  webpack(webpackConfig).watch({}, cb);
} else {
  webpack(webpackConfig, cb);
}
