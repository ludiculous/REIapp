import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {AUTH_USER} from './actions/types';
import reducers from './reducers';
import Routes from './router';
import '../style/materialize.css';
import '../style/react-range.css';
import '../style/style.css';

const App = () => {
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
const token = localStorage.getItem('token')
if(token){
  store.dispatch({type:AUTH_USER})
}
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
