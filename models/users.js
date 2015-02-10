'use strict';

var async = require('async');
var _ = require('lodash');
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

var construct=require('./link').construct;
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
exports.getUsers = function (query, callback){
    var query = query;
    var offset = 0;
    var limit = 0;
    var queryObject = {};
    var project = {};
    for ( var param in query ){
        console.log(param);
        if (param === 'offset')
            offset = parseInt(query[param]);
        else if (param ==='limit')
            limit = parseInt(query[param]);
        else if (param === 'field'){
            var tmp = query[param].split(',')
            for ( var i in tmp ){
                project[tmp[i]] = 1;
            }
        }
        else
            queryObject[param] = query[param];
    }
    async.parallel({one:subcollection,two:count},function(err,collections){
        var data=[];
        var subCollection=collections.one;
        var collectionSize=collections.two;
        subCollection.forEach(function(item,index){
            data[index]=item;
            data[index].link={
                rel:"self",
                href:"/v1/users"+item.id
            };
        })
        var res={};
        res.data=data;
        res.link=construct('/v1/users/',
            offset,
            limit,
            queryObject,
            query.field,
            collectionSize);
        //console.log(res);
        return callback(null,res);
    })
    function subcollection(callback){
        Users.find(queryObject,project).skip(offset > 0 ? offset: 0).limit(limit).exec(callback);
    }
    function count(callback){
        Users.count(queryObject,callback);
    }

}

exports.updateById = function(id,data,callback){
    var userId = id;
    var newData = data;
    //console.log(id);
    Users.findOneAndUpdate({id:userId}, newData, function (err, user) {
        if(err) return callback(err);
        else if(!user) {
            var error = new Error ('No such user,can not put');
            error.statusCode = 404;
            return callback(error, user);
        }
        return callback(null, user);
    });
}