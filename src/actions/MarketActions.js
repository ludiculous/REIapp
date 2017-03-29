import axios from 'axios';
import {CREATE_MARKET, FETCH_MARKET,
   FETCH_ZILLOW_HOME,
   CREATE_ZILLOW_HOME_SEARCH,
   CREATE_ZILLOW_HOME_SEARCH_ERROR,
REMOVE_ZHS_ROW,
ZHS_TO_CSV,
ADD_MEDIAN_DATA
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
        if(typeof Zillowdata.lastSoldPrice !== 'undefined'){
          lastSoldAmount = Zillowdata.lastSoldPrice['$t'];
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
return (dispatch)=>{
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

export const zhs_add_median=(ZMdata)=>{
  console.log(ZMdata)
  return (dispatch)=>{
    dispatch({
      type:ADD_MEDIAN_DATA,
      payload:ZMdata
    })
  }
}


export const calculate_avg = (props)=>{
  const ZData = {
    medianMValue:'',
    medianSold:'',
    medianSqFootage:'',
    medianYOC:''
  };

  const ZHSdata = props.zillowHomes
  const ZHSL = ZHSdata.length
  console.log(props);
    console.log('will mounted')
    const MarketValue = ()=>{
    const mvmSum = _.reduce(ZHSdata, (zhs1,zhs2)=>{
    return parseInt(zhs1.MarketValue)+ parseInt(zhs2.MarketValue);
        })

          console.log(mvmSum)
          const mvm =  mvmSum/ZHSL;
          console.log(mvm);
          ZData.medianMValue = mvm

      }
      MarketValue();

    const SoldPrice = ()=>{
      const spSum = _.reduce(ZHSdata, (zhs1,zhs2)=>{
        return parseInt(zhs1.LastSoldAmount)+ parseInt(zhs2.LastSoldAmount);
      })

      console.log(spSum)
      const spm =  spSum/ZHSL;
      console.log(spm);
      ZData.medianSold = spm;


    }
  SoldPrice();

    const SqFootage = ()=>{
      const sfsum  = _.reduce(ZHSdata, (zhs1,zhs2)=>{
        return parseInt(zhs1.SqFootage)+ parseInt(zhs2.SqFootage);
      })

      console.log(sfsum)
      const sfm =  sfsum/ZHSL;
      console.log(sfm);
      ZData.medianYOC = sfm;

    }
  SqFootage();


    const YOC = ()=>{
      const YOCSum = _.reduce(ZHSdata, (zhs1,zhs2)=>{
        return parseInt(zhs1.YearBuilt)+ parseInt(zhs2.YearBuilt);
      })

      console.log(YOCSum)
      const yocm =  YOCSum/ZHSL;
      console.log(yocm);

    ZData.medianYOC = yocm;

    }

  YOC();

  console.log(props.zillowMedian);

//  this.props.zhs_add_median(ZData);

}






/*
export const zhs_remove_median=()=>{
  return(dispatch)=>{
    dispatch({
      type:REMOVE_MEDIAN_DATA,
      payload:""
    })
  }
}
*/
