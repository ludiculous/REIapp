import {FETCH_MARKET,
  FETCH_ZILLOW_HOME,
  CREATE_ZILLOW_HOME_SEARCH_ERROR,
  CREATE_ZILLOW_HOME_SEARCH,
REMOVE_ZHS_ROW,
REMOVE_MEDIAN_DATA,
ADD_MEDIAN_DATA
} from '../actions/types';
const INITIAL_STATE = {
  marketList:[],
  zillowHomes:[],
  zillowMedian:{},
  zillowSearchError:''
};


export default (state = INITIAL_STATE, action)=>{
    switch (action.type) {
      case FETCH_MARKET:
      return [...state.marketList, action.payload];
      case FETCH_ZILLOW_HOME:
      return  [...state.zillowHomes, action.payload ];
      case CREATE_ZILLOW_HOME_SEARCH_ERROR:
        localStorage.setItem('ZHSDATA', state.zillowHomes)


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

        case REMOVE_ZHS_ROW:
        return Object.assign({}, state, {
          zillowHomes:[
    ...state.zillowHomes.slice(0, action.payload),
   ...state.zillowHomes.slice(action.payload + 1)
                  ],
        zillowSearchError:''
        }
        );

        case ADD_MEDIAN_DATA:
        return Object.assign({}, state, {
          zillowMedian:action.payload
        }
        );
      default:
        return state;
    }
}
