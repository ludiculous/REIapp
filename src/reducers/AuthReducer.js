import {CHANGE_AUTH,AUTH_USER,UNAUTH_USER,AUTH_ERROR} from '../actions/types';
const INITIAL_STATE = {
  loggedIn:false,
  authenticated:false,
  error:''
};

//Object.assign({}, this.state.ticket, {flightNo:'1010'});
export default (state = INITIAL_STATE, action)=>{
    switch (action.type) {
      case CHANGE_AUTH:
        return {loggedIn:action.payload};
      case AUTH_USER:
            return Object.assign({}, state, {authenticated:true,error:''});
      case UNAUTH_USER:
            return Object.assign({}, state, {authenticated:false,error:''});
      case AUTH_ERROR:
              return Object.assign({}, state, {error: action.payload})
      default:
        return state;
    }
}
