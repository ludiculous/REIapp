const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email:{type:String,  unique:true,  lowercase:true},
  password: String
});

//on save hook

userSchema.pre('save', function(next){
  const user = this;
  bcrypt.genSalt(10,function(err,salt){
    if(err){return next(err);}
    bcrypt.hash(user.password,salt,null,function(err,hash){
      if(err){return next(err);}
      user.password = hash;
      next();
    })
  })
})

//the user model holds context to the salts saved to it
//this is the user
//this pw is hashed and salted pw
//this is the blueprint for most req,res fb in express
userSchema.methods.comparePassword = function(candidatePW,callback){
    bcrypt.compare(candidatePW, this.password, function(err, isMatch){
        if(err){return callback(err)}
        callback(null, isMatch);
    });
};

//bcrypt is a Middleware

module.exports = mongoose.model('user', userSchema);
