const Market = require('./controllers/MarketController')

module.exports = (app)=>{
    app.get('/testapi',(req,res)=>{
        res.send({
          msg:'connected routes'
        });
    })
    app.post('/MarketCreate', Market.create);

}
