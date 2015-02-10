'use strict';


var Users = require('../../models/users');

exports.postUsers = function ( req, res, next ) {
    console.log("#########ROUTES#########");///
    Users.createUser(req.body, function (err, result) {
        if (err) {
            //console.log("message = " + err.message);///
            if(err.message.indexOf("dup key") != -1) {
                err.statusCode = 400;
                err.message = "Invalid request: Username already exists."
            }
            return next(err);
        }

        res.location(req.headers.host + "/v1/users/" + result._id);
        res.status(201);
        return res.json({status: 201});
    });
}

exports.deleteUsers = function(req, res, next) {
    console.log("#########ROUTES#########");///
    Users.deleteUsers(req.param.id, function (err, result) {
        if (err) {
            console.log("message = " + err.message);///
            return next(err);
        }

        res.status(204);
        return res.json();
    });
}

exports.getInfo=function(req,res,next){
    var id = req.params.id;
    console.log(id);
    Users.findById(id, function(err, result) {
        if (err) return next(err);
        res.status(200).send(result);
    })
}


exports.search = function ( req, res, next ) {
    var email = req.body.email;
    //console.log(req.body.email);
    Users.findByEmail(email, function(err, result) {
        if (err) return next(err);
        res.status(200).send(result);
    })
}