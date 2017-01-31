const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarketSchema = new Schema({
  location:{
    type:String
  },
    value:{
    type:Number
  }
})

 const Market = mongoose.model('market',MarketSchema);
module.exports = Market;
