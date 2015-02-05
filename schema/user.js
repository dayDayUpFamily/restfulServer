/**
 * Created by YuzhongJi on 2/4/15.
 */
// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// Define user schema
var UserSchema = new Schema({

    username:String,
    // Name
    name : {
        first:  String,
        middle:String,
        last:  String
    },
    gender:String,
    contactInfo:{
        phone:String,
        email:String
    }

});

module.exports=mongoose.model('Users',UserSchema);;