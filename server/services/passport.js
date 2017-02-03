const passport = require('passport');
const User = require('../models/user');
const config =  require("../../secret");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const LocalStrategy = require("passport-local");

const localOptions = {  usernameField:'email'};
const localLogin = new LocalStrategy(localOptions,function(email,password,done){

//purpose of the local strategy is to make sure that there is a user to
//return data for
  User.findOne({email:email},function(err,user){
    if(err) {
      return done(err)
    }
    if(!user){return done(null,false)}
//there are 3 cases either a user is found, or there is an err, or there is no user
//on truthy return the user in question
    user.comparePassword(password,function(err, isMatch){
      console.log(password);
      if(err){return done(err);}
      if(!isMatch){
          return done(null,false)
      }
      console.log(isMatch);
      return done(null,user);
  });

//compare pw if equals to the user.pw
    //decrypt
})


});



/*for user signup*/
const jwtOptions ={
  jwtFromRequest:ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret

};
//payload user id and token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload,done){
  //See if user ID in the payload exists in database
  //If it does, call it
  User.findById(payload.sub,function(err,user){
    if(err){
      return done(err,false)
    }

    if(user){
      //found user
      done(null,user);
    }
    else{
      //no user
      done(null,false);
    }

  })

});

passport.use(jwtLogin);
passport.use(localLogin);
