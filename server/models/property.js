
module.exports ={
  propertyID:Number,
  Address:String,
  City: String,
  State: String,
  Room: Number,
  Bath: Number,
  AskingPrice: Number,
  MarketValue:Number,
  LastSoldDate:String,
  LastSoldAmount:Number,
  YearBuilt:Number,
  SqFootage:Number,
  UseCode:String
}

const property ={
  propertyID:Zillowdata.zpid,
  Address:Zillowdata.address.street,
  City: Zillowdata.city,
  State: Zillowdata.state,
  ZipCode:  Zillowdata.zipcode,
  Room: Zillowdata.bedrooms,
  Bath: Zillowdata.bathrooms,
  AskingPrice: Zillowdata.zestimate.amount['$t'],
  MarketValueHigh:Zillowdata.zestimate.valuationRange.high['$t'],
  MarketValueLow:Zillowdata.zestimate.valuationRange.low['$t'],
  LastSoldDate: Zillowdata.lastSoldDate,
  LastSoldAmount: Zillowdata.lastSoldPrice,
  YearBuilt: Zilowdata.yearBuilt,
  SqFootage:Zillowdata.finishedSqft,
  UseCode: Zillowdata.useCode
}
