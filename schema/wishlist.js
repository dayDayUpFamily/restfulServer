/**
 * Created by YuzhongJi on 2/4/15.
 */
// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserWishListSchema = new Schema({

    userId:String,
    aptId:String,
    interestExtent:Number,
    note:String

});

module.exports=mongoose.model('wishlist',UserWishListSchema);;