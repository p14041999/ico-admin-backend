require('dotenv').config();
const mongo = require('mongoose');
const Admin = require('./models/admin');
const bcrypt = require('bcrypt');
mongo.connect(process.env.MONGO_URI,(err)=>{
    if(err){
        return console.log("ERROR:",err);
    }
    console.log("DB Connected!");
});

async function init(){
    let admin = new Admin({
        email:'admin@zenithchain.co',
        password:bcrypt.hashSync('123456',5),
        otp:123456,
        LastLogin:Date.now()
    })
    await admin.save();
    console.log(admin)
}
init();