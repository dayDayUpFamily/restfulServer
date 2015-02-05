'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var morgan = require('morgan');

var cookieParser=require('cookie-parser');
var app = express();
var config = require('./config');
var routes = require('./middlewares').routes;
var errorHandler = require('./middlewares').errorHandler;

app.set('host', config.host);
app.set('port', config.port);
app.set('env', config.env);
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.all('*', function(err, req, res, next){
  // console.log('REQUEST: ', req.path, ' TIME: ', new Date());
  console.log(err)
  console.log(req.originalUrl, req.method)
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  res.set('Access-Control-Max-Age', config.maxAge);
  res.set('Access-Control-Expose-Headers', 'Content-Range');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});



routes('', app);
app.use(errorHandler);
module.exports = app;

if (!module.parent) {
  app.listen(app.get('port'), app.get('host'), function () {
    console.log('Singleton server running at: %s:%d', app.get('host'), app.get('port'));
  });
}
