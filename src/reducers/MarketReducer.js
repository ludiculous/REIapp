import {FETCH_MARKET,FETCH_ZILLOW_HOME,CREATE_ZILLOW_HOME_SEARCH_ERROR,CREATE_ZILLOW_HOME_SEARCH} from '../actions/types';
const INITIAL_STATE = {
  marketList:[],
  zillowHomes:[],
  zillowSearchError:''
};


export default (state = INITIAL_STATE, action)=>{
    switch (action.type) {
      case FETCH_MARKET:
      return [...state.marketList, action.payload];
      case FETCH_ZILLOW_HOME:
      return  [...state.zillowHomes, action.payload ];
      case CREATE_ZILLOW_HOME_SEARCH_ERROR:
        return  Object.assign({},state,{zillowSearchError:action.payload})
      case   CREATE_ZILLOW_HOME_SEARCH:
        return Object.assign({}, state, {
          zillowHomes:[
            ...state.zillowHomes,
                  action.payload
                  ],
        zillowSearchError:''
        }
        );

      default:
        return state;
    }
}
