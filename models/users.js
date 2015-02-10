'use strict';

var async = require('async');
var _ = require('lodash');
var mongo = require('mongodb');
var BSON = mongo.BSONPure;


var Users = require("./db").Users;

exports.createUser = function (userData, routerCallback) {
    console.log("#########MODELS#########");///
    var fields = ['username', 'password', 'name', 'gender', 'contactInfo'];
    var userDataProjected = _.pick(userData, fields);
    console.log(userDataProjected);///
    var newUser = new Users(userDataProjected);
    newUser.save(function(dbErr,dbResult){
        if(dbErr) return routerCallback(dbErr);
        return routerCallback(dbErr,dbResult);
    });
}

exports.deleteUsers = function (id, routerCallback) {
    console.log("#########MODELS#########");///
    if(id){
        Users.remove({id: id}, function (dbErr, dbResult) {
            if (dbErr) return routerCallback(dbErr);
            return routerCallback(null, dbResult);
        });
    }
    else {
        Users.remove({}, function (dbErr, dbResult) {
            if (dbErr) return routerCallback(dbErr);
            return routerCallback(null, dbResult);
        });
    }
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

exports.findByUsername = function (username, callback) {
    Users.findOne({
        username: username
    }, function (err, user) {
        if(err) return callback(err);
        else if(!user) {
            var error = new Error ('No such username.');
            error.statusCode = 404;
            return callback(error, user);
        }
        return callback(null, user);
    });
}


exports.findById= function (id, callback) {
    Users.findOne({
        "_id": id
    }, function (err, user) {
        if(err) return callback(err);
        else if(!user) {
            var error = new Error ('No such user.');
            error.statusCode = 404;
            return callback(error, user);
        }

        console.log(user);
        return callback(null, user);
    });
}