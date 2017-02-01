import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Home from './pages/Home';
import MarketMain from './pages/MarketMain';
import RECalc  from './pages/REcalc';
import authenticator from './components/require_authentication';

const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: MarketMain },
  childRoutes: [
    {

    }
  ]
};

const Routes = () => {

  return (


    <Router history={hashHistory}>
        <Route path="/" component={Home}>
            <IndexRoute component={MarketMain}/>
            <Route path="RECalc" component={authenticator(RECalc)}/>
        </Route>
    </Router>
  );
};

export default Routes;
