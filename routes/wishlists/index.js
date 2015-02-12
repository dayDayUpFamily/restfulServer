'use strict';


var Wishlists = require('../../models/wishlist');
var Apartments = require('../../models/apartments');


exports.getWishlists=function(req,res,next){
    var userId = req.params.userId;
    var query=req.query;
    //console.log(userId);
    Wishlists.findByUserId(userId,query, function(err, result) {
        if (err) return next(err);
        result.status=200;
        res.status(200).send(result);
     })
}

exports.getWishlistApt=function(req,res,next){
    var userId=req.params.userId;
    var aptId=req.params.id;
    Apartments.findById(aptId, req.query, function(err, result) {
        if (err) return next(err);
        result.status=200;
        res.status(200).send(result);
    })

}

exports.addWishlist=function(req,res,next) {
    var userId = req.params.userId;
    var data = req.body;
    data.userId = userId;
    Wishlists.addByAptId(data, function (err, result) {
        if (err) return next(err);
        res.location(req.headers.host + "/v1/users/" + userId + "/wishlist/apartments/" + data.aptId);
        res.status(201);

        return res.json({status: 201});
    });
}
exports.updateWishlist = function ( req, res, next ) {
    var id = req.params.id;
    var body = req.body;
    console.log(id);
    Wishlists.updateByAptId(id,body, function(err, result) {
        if (err) return next(err);
        res.status(200);
        return res.json({status:200});
    })
}

exports.deleteWishlist = function ( req, res, next ) {
    var aptId = req.params.id;
    var userId = req.params.userId;
    Wishlists.deleteByAptId(aptId, userId, function(err, result) {
        if (err) return next(err);
        res.status(200);
        return res.json({status:200});
    })
}



