import axios from 'axios';
import {CREATE_MARKET} from './types';

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
