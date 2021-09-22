const passport = require('passport');
const User = require('./models/admin');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = ()=>{
    passport.use(new Strategy({usernameField:'username'},async (username, password, done) => {
        try{
            let user = await User.findOne({ email: username });
            if (!user) { return done(null, false,{message:'Invalid Email!'}); }
            if (!bcrypt.compareSync(password,user.password)) { return done(null, false,{message:'Invalid Password'}); }
            // console.log(user);
            return done(null, user);
        }catch(e){         
            console.log(e);   
            return done(e);
        }
    }));
    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            // console.log(user);
            cb(null, user._id);
        });
    });

    passport.deserializeUser(async function(id, cb) {
        // console.log(id);
        let user = await User.findById(id);
        process.nextTick(function() {
            cb(null, user);
        });
    });
}