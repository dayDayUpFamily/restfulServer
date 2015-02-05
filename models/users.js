'use strict';

var async = require('async');
var _ = require('lodash');
var mongo = require('mongodb');
var BSON = mongo.BSONPure;


var Users=require("./db").Users;

exports.save = function (body, callback) {
  var fields = [ 'email', 'password','username','gender','id',];
  var newUser = _.pick(body, fields);
  console.log(newUser);
  var newUser2=new Users(newUser);
  newUser2.save(function(err,result){
    if(err) return callback(err);
    return callback(err,result);
  });
}



exports.findByEmail = function (email, callback) {
  var email = email;
  Users.findOne({
    email: email
  }, function (err, user) {
    if(err) return callback(err);
    else if(!user) {
      var error = new Error ('No such user.');
      error.statusCode = 404;
      return callback(error, user);
    }
    return callback(null, user);
  });
}


exports.findById= function (id, callback) {
  var id=id;
  Users.findOne({
    "id": id
  }, function (err, user) {
    if(err) return callback(err);
    else if(!user) {
      var error = new Error ('No such user.');
      error.statusCode = 404;
      return callback(error, user);
    }
    return callback(null, user);
  });
}


