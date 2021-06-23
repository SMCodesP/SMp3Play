import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/home';

const Routes = () => {
  return (
    <HashRouter basename="/smp3">
      <Switch>
        <Route path="/" exact={true} component={Home} />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
