import {CHANGE_AUTH} from '../actions/types';
const INITIAL_STATE = {loggedIn:false};


export default (state = INITIAL_STATE, action)=>{
    switch (action.type) {
      case CHANGE_AUTH:
        return {loggedIn:action.payload};

      default:
        return state;
    }
}
