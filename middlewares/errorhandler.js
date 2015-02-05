'use strict';

module.exports = function (err, req, res, next) {
  if(err) console.log('Error:', new Date());
  res.status(err.statusCode || err.status || 500);
  res.send({
      message: err.message
  });
}