const User = require('../models/user');

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
              res.send(User)
            })
            .catch(next);
        }
    })
  }




}
