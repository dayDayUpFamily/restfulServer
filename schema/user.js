/**
 * Created by YuzhongJi on 2/4/15.
 */
// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// Define user schema
var UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    // Name
    name: {
        first: {
            type: String,
            required: true
        },
        middle: String,
        last: {
            type: String,
            required: true
        }
    },
    gender: {
        type: Number,
        required: true
    },
    contactInfo: {
        phone:String,
        email: {
            type: String,
            required: true
        }
    },
    link:{rel:String,href:String}


},{ versionKey: false });

module.exports=mongoose.model('Users',UserSchema);;