const User = require('../models/user');
const config = require('../../secret');
const jwt = require('jwt-simple');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({sub:user.id, iat:timestamp },config.secret)
}

module.exports = {

  signup(req,res,next){
    const email = req.body.email;
    const password = req.body.password;
    const userProps = req.body;
//see if there is an existing record
  if(!email|| !password){
    return res.status(422).send({error:"You must provide both Email and Password"})
  }

    User.findOne({email:email},(err,existingUser)=>{
      if(existingUser){
        return res.status(422).send({error:'Email is in use'});
      }
      else{
          User.create(userProps)
            .then(User=>{
              res.send({token:tokenForUser(User)})
            })
            .catch(next);
        }
    })
},

signin(req,res,next){
      //user has already verified email and password
      res.send({token: tokenForUser(req.user)});
}




}
