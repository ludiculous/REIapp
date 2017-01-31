const Market = require("../models/market");

module.exports = {
  create(req,res,next){
    const marketProps = req.body;
    console.log(req.body);
    Market.create(marketProps)
      .then(market=>{
        res.send(market)
      })
      .catch(next);
  }

}
