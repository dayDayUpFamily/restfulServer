'use strict';


var Users = require('../../models/users');

exports.register = function ( req, res, next ) {
  var user=req.body;
  Users.save(user, function (err, result) {
      if (err) return next(err);
      return res.json(result);
    });

}


exports.getInfo=function(req,res,next){
  var id = req.body.id;
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




