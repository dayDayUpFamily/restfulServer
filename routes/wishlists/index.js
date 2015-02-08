'use strict';


var Wishlists = require('../../models/wishlist');



exports.getApartments=function(req,res,next){
    var userId = req.params.userId;
    var query=req.query;
    //console.log(userId);
    Wishlists.findByUserId(userId,query, function(err, result) {
        if (err) return next(err);
        result.status=200;
        res.status(200).send(result);
     })
}

exports.getApartment=function(req,res,next){
    var userId=req.params.userId;
    var aptId=req.params.id;

}

exports.addApartment=function(req,res,next){
    Wishlists.addWishApt(req.body, function(err, result){
        if (err) return next(err);
        res.status(200).send(result);
    });
}





