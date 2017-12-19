module.exports = require('babel-jest').createTransformer({
  presets: ['es2015', 'stage-2', 'react'],
  plugins: ['transform-decorators-legacy'],
});
