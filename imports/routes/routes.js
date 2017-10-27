import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import {isAuthenticated} from '../../client/main';

const history = createBrowserHistory()

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = this.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        history.replace('/dashboard');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace('/');
    };
}


export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => (
        isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <Login />
        )
      )} />
      <Route path="/signup" render={() => (
        isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <Signup />
        )
      )} />
      <Route path="/dashboard" render={() => (
        !isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Dashboard />
        )
      )} />
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);