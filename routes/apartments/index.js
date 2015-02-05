'use strict';

var _ = require('lodash');

var Apartments = require('../../models/apartments');



exports.findById = function ( req, res, next ) {
  var id = req.params.id;
  Apartments.findById(id, function(err, result) {
    if (err) return next(err);
    res.status(200).send(result);
  })
}

