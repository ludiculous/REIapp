/*const assert = require('assert');
const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Market = mongoose.model('market');

describe('Express App', () => {



it('Fetchs a market from /fetchMarket',(done)=>{
request(app)
  .get('/fetchMarket')
    .end((err,res)=>{
      assert(res!="");
      done();
   })

  })


  it('Post to /api/market creates a new market',  function(done) {
   this.timeout(15000);
    setTimeout(done, 15000);
      Market.count().then(count => {
        request(app)
        .post('/MarketCreate')
        .send({
            location: 'Sacramento',
            value: 250000
        })
        .end(() => {
              Market.count()
              .then(newCount=>{

                console.log(newCount)
                        assert(count+1===newCount);
                        done();
                })

            });
      });
});


})*/
