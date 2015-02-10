'use strict';

var async = require('async');
var _ = require('lodash');
var mongo = require('mongodb');
var Apartments=require("./db").Apartments;
var construct=require('./link').construct;
var BSON = mongo.BSONPure;

exports.findById= function (id, query, callback) {
    var apartmentId = id;
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
    queryObject.id = apartmentId;

    async.parallel({one:subcollection,two:count},function(err,collections){
        var data=[];
        var subCollection=collections.one;
        var collectionSize=collections.two;
        subCollection.forEach(function(item,index){
            data[index]=item;
            data[index].link={
             rel:"self",
             href:"/v1/apartments/"+item.id
             };
            //console.log("************" + data[index].link);

        })

        var res={};
        res.data=data;
        delete queryObject.id;
        res.link=construct('/v1/apartments' + apartmentId + '/',
            offset,
            limit,
            queryObject,
            query.field,
            collectionSize);
        console.log(res);
        return callback(null,res);
    })
    function subcollection(callback){
        Apartments.find(queryObject,project).skip(offset > 0 ? offset: 0).limit(limit).exec(callback);
    }
    function count(callback){
        Apartments.count(queryObject,callback);
    }


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
                href:"/v1/apartments/"+item.id
            };
             console.log(data[0]);
        })

        var res={};
        res.data=data;
        res.link=construct('/v1/apartments/',
            offset,
            limit,
            queryObject,
            query.field,
            collectionSize);
       // console.log(res);
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

exports.addApartment=function(data,callback){
    Apartments.create(data,function(err,result){
        if(err)return callback(err);
        return callback(null,result);
    })
}
