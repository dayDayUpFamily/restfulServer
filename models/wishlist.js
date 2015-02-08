'use strict';

var async = require('async');
var _ = require('lodash');
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

var Wishlists=require("./db").Wishlists;
var construct=require('./link').construct;

exports.findByUserId= function (id,query, callback) {
    var userId=id;
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
            data[index]=item;
/*            data[index].link={
                rel:"self",
                href:"/v1/users/"+item.userId+'wishlist/apartments'
            };*/
        })

        var res={};
        res.data=data;
        delete queryObject.userId;
        res.link=construct('/v1/users/'+userId+'/wishlist/apartments',
            offset,
            limit,
            queryObject,
            query.field,
            collectionSize);
        console.log(res);
        return callback(null,res);
    })
    function subcollection(callback){
        Wishlists.find(queryObject,project).skip(offset > 0 ? offset: 0).limit(limit).exec(callback);
    }
    function count(callback){
        Wishlists.count(queryObject,callback);
    }

}

exports.addWishApt=function(data,callback){
    Wishlists.create(data,function(err,result){
        if(err)return callback(err);
        return callback(null,result);
    })
}
