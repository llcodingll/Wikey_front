const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (!webpackConfig.resolve.plugins) {
        webpackConfig.resolve.plugins = [];
      }
      webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin());
      return webpackConfig;
    },
  },
};
