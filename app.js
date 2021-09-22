#!/usr/bin/env node
if(global.TextEncoder === undefined){
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
}
const express = require('express');
const mongo = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const app = express();
const cookieParser = require('cookie-parser');
const path=require('path');
const router = require('./routes/all-routes');


mongo.connect(process.env.MONGO_URI,(err)=>{
    if(err){
        return console.log("ERROR:",err);
    }
    console.log("DB Connected!");
});

app.use(cors());
app.use(express.static(path.join(__dirname,'public/')));
console.log(path.join(__dirname,'public/'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','ejs');
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(require('express-flash')());
app.use(cookieParser())
require('./auth')();
app.use(passport.initialize());
// app.use(passport.authenticate('session'));
app.use(passport.session());


app.use('/',router);

app.listen(process.env.PORT,()=>{
    console.log("Application server Started!\nGo To http://127.0.0.1:"+process.env.PORT)
})
