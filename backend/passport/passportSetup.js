const passport = require('passport');// This is how you initialize the local strategy module
const User= require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});



passport.use(new LocalStrategy(
    {
        usernameField:'username'
    },
    function (username,password,done){
        User.findOne({username:username},(err,user)=>{
            if (err){
                return done(err)
            }
            if (!user){
                return done(null,false,{message: "Incorrect User" })
            }
            if (!user.checkPassword(password)){
                return done(null,false,{message:"Incorrect Password"})
            }
            return done(null,user)
        })
    }

));

module.exports=passport;