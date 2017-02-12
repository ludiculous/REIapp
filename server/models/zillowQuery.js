const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ZillowQuerySchema = new Schema({
  propertyID:String,
  Address:String,
  City: String,
  State: String,
  ZipCode:  String,
  Room: String,
  Bath: String,
  AskingPrice: String,
  MarketValue: String,
  LastSoldDate: String,
  LastSoldAmount:String,
  YearBuilt: String,
  SqFootage:String,
  UseCode: String,
})

module.exports = ZillowQuerySchema;
