const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'pixelCharts',
    libraryTarget: 'umd'
  }
};
