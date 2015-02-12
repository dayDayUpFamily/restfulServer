'use strict';

var async = require('async');
var _ = require('lodash');
var mongo = require('mongodb');
var Apartments=require("./db").Apartments;
var construct=require('./link').construct;
var BSON = mongo.BSONPure;

exports.findById= function (id, query, callback) {
    var id = id;
    var query = query;
    var project={};
    if(query.field) {
        var tmp = query.field.split(',')
        for(var i in tmp){
            project[tmp[i]]=1;
        }
    }
    //console.log(id);
    Apartments.findOne({_id:id},project).exec(function(err,data){
        var res={};
        if(err) return callback(err);
        else if(!data) {
            var error = new Error ('No such apartment.');
            error.statusCode = 404;
            return callback(error, data);
        }
        data.link={
                rel:"self",
                href:"/v1/apartments/"+data._id
            };
        res.data=data;
        return callback(null,res);
    });
}


exports.getApartments = function (query, callback) {
    var query = query;
    var offset = 0;
    var limit = 0;
    var queryObject = {};
    var project={};
    for (var param in query){
        if(param==='offset')
            offset = parseInt(query[param]);
        else if (param ==='limit')
            limit = parseInt(query[param]);
        else if(param==='field') {
            var tmp = query[param].split(',')
            for(var i in tmp){
                project[tmp[i]]=1;
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
            console.log(index);
            data[index]=item;
            data[index].link={
                rel:"self",
                href:"/v1/apartments/"+item._id
            };
        })

        var res={};
        res.data=data;
        if(limit!=0) {
            res.link = construct('/v1/apartments/', offset, limit, queryObject, query.field, collectionSize);
        }
        return callback(null,res);
    })
    function subcollection(callback){
        Apartments.find(queryObject,project).skip(offset > 0 ? offset: 0).limit(limit).exec(callback);
    }
    function count(callback){
        Apartments.count(queryObject,callback);
    }
}

exports.deleteById = function (id, callback) {
    var id = id;
    Apartments.remove({
        _id: id
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
    Apartments.findOneAndUpdate({_id:apartmentId}, data, function (err, apartment) {
        if(err) return callback(err);
        else if(!apartment) {
            var error = new Error ('No such apartment,can not put');
            error.statusCode = 404;
            return callback(error, apartment);
        }
        return callback(null, apartment);
    });
}

exports.addApartment=function(data,callback){
    Apartments.create(data,function(err,result){
        if(err)return callback(err);
        return callback(null,result);
    })
}
