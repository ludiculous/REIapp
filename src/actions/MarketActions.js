import axios from 'axios';
import {CREATE_MARKET, FETCH_MARKET} from './types';

export const fetchMarket = ()=>{
  return (dispatch) =>{
    axios("/fetchMarket")
      .then(res=>{
        console.log(res.marketData);
        dispatch({
          type: FETCH_MARKET,
          payload: res.marketData
        })
        .catch(err =>{
          console.log(err)
        })
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
