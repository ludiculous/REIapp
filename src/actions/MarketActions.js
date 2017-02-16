import axios from 'axios';
import {CREATE_MARKET, FETCH_MARKET,
   FETCH_ZILLOW_HOME,
   CREATE_ZILLOW_HOME_SEARCH,
   CREATE_ZILLOW_HOME_SEARCH_ERROR,
REMOVE_ZHS_ROW,
ZHS_TO_CSV
 } from './types';

export const fetchMarket = ()=>{
  return (dispatch) =>{
    axios("/fetchMarket")
      .then(res=>{
        console.log(res.marketData);
        dispatch({
          type: FETCH_MARKET,
          payload: res.marketData
        })

      }).catch(err =>{
            console.log(err)
        })
  }

}

/*
*/


export const createMarket = (MarketData) => {
    return (dispatch) => {
        axios({
          method:'post',
          url:'/MarketCreate',
          data:MarketData
        }).then(res => {
                dispatch({
                    type: CREATE_MARKET,
                    payload:MarketData
                })
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }
}


export const fetchZillowHome = ()=>{
        return (dispatch) =>{
          axios("/api/zillowSearch")
            .then((res)=>{
              const Jres = res.data.results;
              //const data = JSON.parse(Jres);
              //const Zillowdata = data['SearchResults:searchresults']["response"]["results"]["result"]
              //console.log(Zillowdata);
              localStorage.setItem('zillow',Jres);
              console.log(Jres);
              dispatch({
                type: FETCH_MARKET,
                payload: res
              })

            }).catch(err =>{
                  console.log(err)
              })
        }
}


export const createZHS = (ZHSData)=>{
  return (dispatch)=>{
      axios(
        {
          method:'post',
          url:  '/api/ZillowHomeSearch',
          data:ZHSData
        })
      .then((res)=>{
        const Zillowdata = res.data.results;

        let lastSoldDate = "";
        if(typeof Zillowdata.lastSoldDate !== 'undefined'){
          lastSoldDate = Zillowdata.lastSoldDate
        }
        let lastSoldAmount = "";
        if(typeof Zillowdata.lastSoldAmount !== 'undefined'){
          lastSoldAmount = Zillowdata.lastSoldAmount;
        }

        const ZMD =   {
            propertyID:Zillowdata.zpid || "NA",
            Address:Zillowdata.address.street || "NA",
            City: Zillowdata.address.city || "NA",
            State: Zillowdata.address.state || "NA",
            ZipCode:  Zillowdata.address.zipcode || "NA",
            Room: Zillowdata.bedrooms || "NA",
            Bath: Zillowdata.bathrooms || "NA",
            AskingPrice: Zillowdata.localRealEstate.region.zindexValue || "NA",
            MarketValue: Zillowdata.zestimate.amount['$t'] || "NA",
            LastSoldDate: lastSoldDate,
            LastSoldAmount: lastSoldAmount,
            YearBuilt: Zillowdata.yearBuilt || "NA",
            SqFootage:Zillowdata.lotSizeSqFt || "NA",
            UseCode: Zillowdata.useCode || "NA"
          }


        console.log(ZMD)
        if(typeof ZMD.propertyID !== 'undefined'){
          console.log('dispatched!')
            dispatch({
              type: CREATE_ZILLOW_HOME_SEARCH,
              payload: ZMD
            })
        }


      })
      .catch(err=>{
        console.log(err);
          dispatch({
            type: CREATE_ZILLOW_HOME_SEARCH_ERROR,
            payload: 'Search Inputs Incorrectly Formatted'
          })
      })
  }
}

export  const  removeZHSrow = (ZHSindex)=>{
  console.log(ZHSindex)
  return (dispatch)=>{
    dispatch({
      type:REMOVE_ZHS_ROW,
      payload: ZHSindex
    })
  }
}

export const zhs_to_csv = (ZHSdata)=>{
  console.log(ZHSdata)
  return(dispatch)=>{
    axios({
      method:'post',
      url:'/api/ZHStoCSV',
      data:ZHSdata
    })
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err);
    })
  }
}
