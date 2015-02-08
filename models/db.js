var mongoose = require('mongoose');
var config = require('../config'),
    mongodb = require('mongodb');
var url = config.mongodb.url;
require("../schema/user").Users;
require("../schema/apartment").Apartments;
require("../schema/wishlist").Wishlists;
console.log('Try to connect to MongoDB via Mongoose ...');
var conn = mongoose.createConnection(url);
conn.on('error', console.error.bind(console, 'Mongoose connection error:'));

exports.Users=conn.model("Users");
exports.Apartments=conn.model("Apartments");
exports.Wishlists=conn.model("wishlist");