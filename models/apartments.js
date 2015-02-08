'use strict';

var async = require('async');
var _ = require('lodash');
var mongo = require('mongodb');
var Apartments=require("./db").Apartments;

exports.findById = function (id, callback) {
  var id = id;
  Apartments.findOne({
    id: id
  }, function (err, apartment) {
    if(err) return callback(err);
    else if(!apartment) {
      var error = new Error ('No such apartment.');
      error.statusCode = 404;
      return callback(error, apartment);
    }
    return callback(null, apartment);
  });
}

exports.deleteById = function (id, callback) {
    var id = id;
    Apartments.remove({
        id: id
    }, function (err, apartment) {
        if(err) return callback(err);
        else if(!apartment) {
            var error = new Error ('No such apartment,can not delete');
            error.statusCode = 404;
            return callback(error, apartment);
        }
        return callback(null, apartment);
    });
}
exports.putById = function(id,data,callback){
    var apartmentId = id;
    var data = data;
    console.log(id);
    Apartments.findOneAndUpdate({id:apartmentId}, data, function (err, apartment) {
        if(err) return callback(err);
        else if(!apartment) {
            var error = new Error ('No such apartment,can not put');
            error.statusCode = 404;
            return callback(error, apartment);
        }
        return callback(null, apartment);
    });
}
