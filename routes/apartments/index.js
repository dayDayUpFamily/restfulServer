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

exports.deleteById = function ( req, res, next ) {
    var id = req.params.id;
    Apartments.deleteById(id, function(err, result) {
            if (err) return next(err);
        res.status(200).send(result);
    })
}

exports.putById = function ( req, res, next ) {
    var id = req.params.id;
    var body = req.body;
    Apartments.putById(id,body, function(err, result) {
        if (err) return next(err);
        res.status(200).send(result);
    })
}