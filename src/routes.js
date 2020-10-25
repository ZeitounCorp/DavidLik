import React from 'react';
// Mount is used to render pages
import { mount } from 'react-mounter';
// Router implementation modules
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

// Here begin the imports of pages we want to render
import Home from './pages/Home';
import Unsubscribe from './pages/Unsubscribe';
import SuccessSub from './pages/SuccessSub';

// Not Found Page
import NotFound from './pages/NotFound';

// Imports of Layouts
import DefaultLayout from './layouts/DefaultLayout';

function default_router(props, COMPONENT) {
  return (
    mount(DefaultLayout, { content: <COMPONENT {...props} />, ...props })
  );
}

const DefaultRouter = (
  <Router >
    <Switch>
      <Route exact path="/" render={(props) => default_router(props, Home)} />
      <Route exact path="/unsubscribe" render={(props) => default_router(props, Unsubscribe)} />
      <Route exact path="/success_sub" render={(props) => default_router(props, SuccessSub)} />
      <Route render={(props) => default_router(props, NotFound)} />
    </Switch>
  </Router>
);

export default DefaultRouter

