const add = "123"
const state = "CA"
const city = "South San Francisco"
const street = "Chestnut Ave"
const address= add +" "+street;
const area = city+","+state;

const uri1 = encodeURIComponent(address);
const uri2 = '&citystatezip='
const uri3 = encodeURIComponent(area);

uri1+uri2+uri3


const ZWSID = 'X1-ZWz1fkrzad0paj_6plsv'
Below is an example of calling the API for the address for the exact address match "2114 Bigelow Ave", "Seattle, WA":
http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=<ZWSID>&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA

http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1fkrzad0paj_6plsv&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA
http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1fkrzad0paj_6plsv&address=123%20Chestnut%20Ave&citystatezip=South%20San%20Francisco%2CCA
