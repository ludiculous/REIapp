
/*
const ZWSID = 'X1-ZWz1fkrzad0paj_6plsv'
Below is an example of calling the API for the address for the exact address match "2114 Bigelow Ave", "Seattle, WA":
http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=<ZWSID>&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA

=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA
zws-id=X1-ZWz1fkrzad0paj_6plsv&address=123%20Chestnut%20Ave&citystatezip=South%20San%20Francisco%2CCA
*/

const fs = require('fs');
const currTime = Date.now()
const parser = require('xml2json');
const request = require('request');

const json2csv = require('json2csv');
const blobStream = require('blob-stream');
const PDFDOC = require('pdfkit');
doc = new PDFDOC;


module.exports = {


    SearchHome(req,res,next){

      const zillowProps = req.body;
      const AddressRoot = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1fkrzad0paj_6plsv&address=';
      const area = zillowProps.city+","+ zillowProps.state;
      const uri1 = encodeURIComponent(zillowProps.address);
      const uri2 = '&citystatezip='
      const uri3 = encodeURIComponent(area);
      const HSU= AddressRoot+uri1+uri2+uri3;

      console.log(req.body);
      console.log(HSU);

      request(HSU,function (error, response, body) {
        if (!error && response.statusCode == 200) {

                    const xml = body
                    const json = JSON.parse(parser.toJson(xml));
                    let Zillowdata = ''

                    if(typeof json['SearchResults:searchresults']["response"] != 'undefined'){
                      Zillowdata = json['SearchResults:searchresults']["response"]["results"]["result"]

                    //for every data object which calls this function
                    //push it into ZMD
                      console.log(Zillowdata);
                                    let lastSoldDate = "";
                                    if(typeof Zillowdata.lastSoldDate !== 'undefined'){
                                      lastSoldDate = Zillowdata.lastSoldDate
                                    }
                                    let lastSoldAmount = "";
                                    if(typeof Zillowdata.lastSoldAmount !== 'undefined'){
                                      lastSoldAmount = Zillowdata.lastSoldAmount;
                                    }

/* to remove Directory
                        const removeDir = function(dirPath) {
                              try { var files = fs.readdirSync(dirPath); }
                              catch(e) { return; }
                              if (files.length > 0)
                                for (var i = 0; i < files.length; i++) {
                                  var filePath = dirPath + '/' + files[i];
                                  if (fs.statSync(filePath).isFile())
                                    fs.unlinkSync(filePath);
                                  else
                                    rmDir(filePath);
                                }
                              fs.rmdirSync(dirPath);
                            }

                          setTimeout(removeDir('csv'),5000);*/

                              res.send({results:Zillowdata})
            }
            else{
              res.send({
                error: 'Zillow Search Did Not Return Any Results'
              })
            }
            //if data not undefined
        }//if res 200
    }) .on('error', function(err) {
      console.log(err);
      res.send({
        error:err
      })
  })


    //end of request


  },
//end of  ZHS

CreateCSV(req,res,next){

const Zillowdata = req.body
console.log(req);
console.log(Zillowdata)

  const myFields = [
    {label:"propertyID",
    value:this.data.zhs.propertyID,
    default:''
    },
    {label: "Address",
    value:this.data.zhs.Address,
    default:""},
    {label:"City",
    value:this.data.zhs.City,
    default:""
  },
  {
    label: "State",
    value:data.zhs.State,
    default:""
  } ,
    {
      label:"ZipCode",
      value:data.zhs.ZipCode,
      default:""
    },
    {label:  "Room",
    value:data.zhs.Room,
    default:""
  }
  ,
  {label:"Bath",
value:data.zhs.Bath,
default:""
}
    ,
    {label:  "AskingPrice",
  value:data.zhs.AskingPrice,
  default:""
},
{label: "MarketValue",
value:data.zhs.MarketValue,
default:""
},
{label:  "LastSoldDate",
value:data.zhs.LastSoldDate,
default:""
}  ,
  {label:  "LastSoldAmount",
  value:data.zhs.LastSoldAmount,
  default:""
  }
  ,
   {label: "YearBuilt",
    value:data.zhs.YearBuilt,
    default:""
  },
  {label:"SqFootage",
   value:data.zhs.SqFootage,
   default:""
 }
  ,
  {label:  "UseCode",
   value:data.zhs.UseCode,
   default:""
 }  ,
 {label: "Median Value",
  value:data.median.medianMValue,
  default:""
}  ,
{label: "Median Sold",
 value:data.median.medianSold,
 default:""
},

{label: "Median Year Of Construction",
 value: data.median.medianYOC,
 default:""
},

{label: "Median SqFootage",
 value: data.median.medianSqFootage,
 default:""
}

  ]




  const currTime = Date.now();
  const csv = json2csv({ data: Zillowdata, fields: myFields });

  fs.writeFile(`csv/ZMD${currTime}.csv`, csv, function(err) {
    if (err) throw err;
    console.log(err);
    console.log('file saved');
  });

res.send({
  success:'File Was Saved'
})

}




}
