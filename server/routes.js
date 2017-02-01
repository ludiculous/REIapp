const Market = require('./controllers/MarketController');
const Authentication = require('./controllers/AuthenticationController');

module.exports = (app)=>{
    app.get('/testapi',(req,res)=>{
        res.send({
          msg:'connected routes'
        });
    })

app.get('/fetchMarket', Market.fetch);
app.post('/MarketCreate', Market.create);

app.post('/signup',Authentication.signup);


}
