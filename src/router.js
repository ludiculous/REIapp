import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './pages/Home';

import ArtistMain from './components/artists/ArtistMain';
import MarketMain from './pages/MarketMain';

const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: MarketMain },
  childRoutes: [
    {
      path: 'artists/new',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistCreate')
          .then(module => cb(null, module.default));
      }
    },
    {
      path: 'artists/:id',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistDetail')
          .then(module => cb(null, module.default));
      }
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistEdit')
          .then(module => cb(null, module.default));
      }
    }
  ]
};

const Routes = () => {
  return (
    <Router history={hashHistory} routes={componentRoutes} />
  );
};

export default Routes;
