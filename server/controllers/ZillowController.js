
/*
const ZWSID = 'X1-ZWz1fkrzad0paj_6plsv'
Below is an example of calling the API for the address for the exact address match "2114 Bigelow Ave", "Seattle, WA":
http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=<ZWSID>&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA

=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA
zws-id=X1-ZWz1fkrzad0paj_6plsv&address=123%20Chestnut%20Ave&citystatezip=South%20San%20Francisco%2CCA
*/
const request = require('request');
const AddressRoot = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1fkrzad0paj_6plsv&address=';
const add = "123"
const state = "CA"
const city = "South San Francisco"
const street = "Chestnut Ave"
const address= add +" "+street;
const area = city+","+state;
const uri1 = encodeURIComponent(address);
const uri2 = '&citystatezip='
const uri3 = encodeURIComponent(area);
const HomeSearchUrl = AddressRoot+uri1+uri2+uri3;
const fs = require('fs');
const currTime = Date.now()
const parser = require('xml2json');


const json2csv = require('json2csv');
const blobStream = require('blob-stream');
const PDFDOC = require('pdfkit');
doc = new PDFDOC;



module.exports = {
    SearchHome(req,res,next){
      request(HomeSearchUrl,function (error, response, body) {
        if (!error && response.statusCode == 200) {

        const xml = body
        const json = JSON.parse(parser.toJson(xml));
        const Zillowdata = json['SearchResults:searchresults']["response"]["results"]["result"]

        const myFields = [
          "propertyID",
          "Address",
          "City",
          "State",
          "ZipCode",
          "Room",
          "Bath",
          "AskingPrice",
          "MarketValue",
          "LastSoldDate",
          "LastSoldAmount",
          "YearBuilt",
          "SqFootage",
          "UseCode"
        ]


        //for every data object which calls this function
        //push it into ZMD
          console.log(Zillowdata);

          const ZMD = [
            {
              propertyID:Zillowdata.zpid,
              Address:Zillowdata.address.street,
              City: Zillowdata.address.city,
              State: Zillowdata.address.state,
              ZipCode:  Zillowdata.address.zipcode,
              Room: Zillowdata.bedrooms,
              Bath: Zillowdata.bathrooms,
              AskingPrice: Zillowdata.localRealEstate.region.zindexValue,
              MarketValue: Zillowdata.zestimate.amount['$t'],
              LastSoldDate: Zillowdata.lastSoldDate,
              LastSoldAmount: Zillowdata.lastSoldPrice['$t'],
              YearBuilt: Zillowdata.yearBuilt,
              SqFootage:Zillowdata.finishedSqFt,
              UseCode: Zillowdata.useCode
            }
          ]

          const currTime = Date.now();
          const csv = json2csv({ data: ZMD, fields: myFields });

          fs.writeFile(`csv/ZMD${currTime}.csv`, csv, function(err) {
            if (err) throw err;
            console.log('file saved');
          });



          res.send({results:Zillowdata})

        }
    })
  }




/*

*/

/*
      stream = doc.pipe(blobStream())
      doc.end()
      stream.on('finish', ()=>{
          blob = stream.toBlob(`../pdfs/ZillowMarket${currTime}.pdf`);
          url = stream.toBlubURL(`../pdfs/ZillowMarket${currTime}.pdf`);
          res.send({
            iframe: url
          })
      })
*/



}
