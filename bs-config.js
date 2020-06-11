'use strict';

module.exports = {
  port: 3300,
  server: {
      baseDir: './dist',
      middleware: {
          1: require('connect-history-api-fallback')({ index: '/index.html', verbose: true })
      }
  }
};