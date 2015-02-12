'use strict';

var _ = require('lodash');

var Apartments = require('../../models/apartments');



exports.getApartment = function ( req, res, next ) {
  var id = req.params.id;
    console.log(id);
  Apartments.findById(id, req.query, function(err, result) {
    if (err) return next(err);
      result.status=200;
      res.status(200).send(result);
  })
}

exports.getApartments = function ( req, res, next ) {
    Apartments.getApartments(req.query, function(err, result) {
        if (err) return next(err);
        result.status=200;
        res.status(200).send(result);
    })
}

exports.addApartment = function ( req, res, next ) {
    Apartments.addApartment(req.body, function(err, result) {
        if (err) return next(err);
        res.location(req.headers.host + "/v1/apartments/" + result._id);
        res.status(201);
        return res.json({status: 201});
    })
}

exports.deleteApartment = function ( req, res, next ) {
    var id = req.params.id;
    Apartments.deleteById(id, function(err, result) {
            if (err) return next(err);
        result.status=200;
        res.status(200).send(result);
    })
}

exports.updateApartment = function ( req, res, next ) {
    var id = req.params.id;
    var body = req.body;
    Apartments.putById(id,body, function(err, result) {
        if (err) return next(err);
        result.status=200;
        res.status(200).send(result);
    })
}