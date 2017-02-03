const Market = require('./controllers/MarketController');
const Authentication = require('./controllers/AuthenticationController');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt',{session:false});

//the string is the type of strategy which was initiated in the
//services file for passport
const requireSignin = passport.authenticate('local',{session:false});

module.exports = (app)=>{

    app.get('/api',requireAuth,(req,res)=>{
        res.send({
          msg:'SuperSecret'
        });
    })

    /*
  app.get('/',requireAuth,(req,res)=>{
    res.send({msg:'authed'})
  })*/

app.get('/fetchMarket', Market.fetch);
app.post('/MarketCreate', Market.create);

app.post('/signin', requireSignin, Authentication.signin);
app.post('/signup',Authentication.signup);


}
