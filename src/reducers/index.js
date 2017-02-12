import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { gridReducers} from 'react-redux-grid';
//import { Reducers as gridReducers } from 'react-redux-grid';
import authReducer from './AuthReducer';
import marketReducer from './MarketReducer';


export default combineReducers({
  form: formReducer,
  Authenticate: authReducer,
  Market: marketReducer,


});
