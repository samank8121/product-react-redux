const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  style: {
    modules: {
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
    sass: {
      loaderOptions: {
        // Any additional options here
      },
    },
  },
};
