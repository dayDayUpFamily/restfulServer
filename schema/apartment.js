/**
 * Created by YuzhongJi on 2/4/15.
 */
/**
 * Created by YuzhongJi on 2/4/15.
 */
// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Require bcrypt for hashing passwords
var bcrypt = require('bcrypt');

// Define user schema
var ApartmentSchema = new Schema({
   price:Number,
    id:Number,
    room:Number,
    bath:Number,
    floor:Number,
    brokerFee:Number,
    link:{rel:String,href:String}

});

module.exports = mongoose.model('Apartments', ApartmentSchema);
