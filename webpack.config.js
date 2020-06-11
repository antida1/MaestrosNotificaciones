'use strict';

const environment = (process.env.NODE_ENV || 'development').trim();

console.log("--------------------------- *** ---------------------------");
console.log("environment", environment);
console.log("--------------------------- *** ---------------------------\n");

if (environment === 'development') {
    module.exports = require('./config/webpack.config.dev');
} else if (environment === 'production') {
    module.exports = require('./config/webpack.config.prod');
} else if (environment === 'test') {
    module.exports = require('./config/webpack.config.qas');
}