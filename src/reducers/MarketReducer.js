import {FETCH_MARKET,FETCH_ZILLOW_HOME} from '../actions/types';
const INITIAL_STATE = {
  marketList:[],
  zillowHomes:[]
};


export default (state = INITIAL_STATE, action)=>{
    switch (action.type) {
      case FETCH_MARKET:
      return [...state.marketList, action.payload]
      case FETCH_ZILLOW_HOME:
      return  [...state.zillowHomes, action.payload ]
      default:
        return state;
    }
}
