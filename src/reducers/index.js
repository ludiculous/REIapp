import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './AuthReducer';
import marketReducer from './MarketReducer';

export default combineReducers({
  form: formReducer,
  Authenticate: authReducer,
  Market: marketReducer

});
