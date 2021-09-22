const mongo = require('mongoose');

const UserSchema = new mongo.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mail_confirmed:{
        type:Boolean,
        default:false
    },
    mail_confirm_phrase:{
        type:String,
        select:false,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    wallet_id:{
        type:String,
        default:""
    },
    forget_phrase:{
        type:String,
        default:"NA",
        select:false
    }
});

module.exports = mongo.model("User",UserSchema);