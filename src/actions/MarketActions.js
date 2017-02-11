import axios from 'axios';
import {CREATE_MARKET, FETCH_MARKET, FETCH_ZILLOW_HOME} from './types';

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


export const createZHS = ()=>{
  return (dispatch)=>{
      axios.post('/api/zillowSearch')
      .then((res)=>{
        const Jres = res.data.results;
        dispatch({
          type: CREATE_ZILLOW_HOME_SEARCH,
          payload: Jres
        })
      })
      .catch(err=>{
        console.log(err)
      })
  }
}
