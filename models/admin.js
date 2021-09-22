const mongo = require('mongoose');

const adminSchema = new mongo.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    otp:Number,
    LastLogin:Number
});

module.exports = mongo.model('Admin',adminSchema);