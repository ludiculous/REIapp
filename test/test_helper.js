const mongoose = require('mongoose');

before(done=>{
  mongoose.connect('mongodb://localhost/Test_REItraffic');
  mongoose.connection
    .once('open' ,()=>{
        console.log('mongo is good from test')
      done()})
    .on('error',err=>{
      console.warn('warning',err)
    })
});


beforeEach(done=>{
  const {markets,users} = mongoose.connection.collections;
    markets.drop()
      .then(()=>done())
      .catch(()=>done())
})
