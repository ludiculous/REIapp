const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ZillowQuerySchema = new Schema({
  propertyID:String,
  Address:String,
  City: String,
  State: String,
  ZipCode:  String,
  Room: Number,
  Bath: Number,
  AskingPrice: Number,
  MarketValue: Number,
  LastSoldDate: String,
  LastSoldAmount:Number,
  YearBuilt: String,
  SqFootage:Number,
  UseCode: String,
})

module.exports = ZillowQuerySchema;
