'use strict';

var _ = require('lodash');

var app = exports;

var env = process.env.NODE_ENV || 'development';

app.env = env;
app.port = '1123';
app.host = 'localhost';
app.maxAge = 3600 * 24 * 7 * 30;

module.exports = _.assign(app, require('./'+ env + '.json'));
