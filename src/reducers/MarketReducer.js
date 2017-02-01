import {FETCH_MARKET} from '../actions/types';
const INITIAL_STATE = {
  marketList:[]
};


export default (state = INITIAL_STATE, action)=>{
    switch (action.type) {
      case FETCH_MARKET:
      return [...state.marketList, action.payload]
        break;
      default:
        return state;
    }
}
