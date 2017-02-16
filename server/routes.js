const Market = require('./controllers/MarketController');
const Authentication = require('./controllers/AuthenticationController');
const passportService = require('./services/passport');
const passport = require('passport');
const Zillow = require('./controllers/ZillowController');

const requireAuth = passport.authenticate('jwt',{session:false});
//supply jwt to headers prop authorization
//the string is the type of strategy which was initiated in the
//services file for passport
const requireSignin = passport.authenticate('local',{session:false});
const testVar = {test:'tesst'}

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

  app.get('/api/zillowSearch',Zillow.SearchHome)




app.get('/fetchMarket', Market.fetch);
app.post('/MarketCreate', Market.create);

app.post('/api/ZillowHomeSearch',Zillow.SearchHome);
app.post('/api/ZHStoCSV',Zillow.CreateCSV);


app.post('/signin', requireSignin, Authentication.signin);
app.post('/signup',Authentication.signup);


}
