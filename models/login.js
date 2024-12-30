const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
 username:{
    required:true,
    type:String
 },
 password:{
    required:true,
    type:String
 },

});
const auth= mongoose.model('auth',loginSchema);
module.exports = auth;