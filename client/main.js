import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import createHistory from 'history/createBrowserHistory';

import Login from '../imports/ui/Login';
import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';

export const history = createHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = (Component) => {
  if(Meteor.userId()){
    return <Redirect to="/links"/>
  }else {
    return <Component />
  }
};

const onEnterPrivatePage = (Component) => {
  if(!Meteor.userId()){
    return <Redirect to="/" />
  }else{
    return <Component />
  }
}

{/**React-router v3 **/}

{/**
const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={Signup}/>
    <Route path="links" component={Links}/>
  </Router>
);
**/}

const Routes = () => (
<Router history={history}>
  <Switch>
    <Route path="/" exact={true} render={() => onEnterPublicPage(Login)} />
    <Route path="/signup" render={() => onEnterPublicPage(Signup)}/>
    <Route path="/links" render={() => onEnterPrivatePage(Link)}/>
    <Route path="*" component={NotFound} />
  </Switch>
</Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathName = history.location.pathname;
  console.log(pathName);
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if(isUnauthenticatedPage && isAuthenticated){
    history.replace('/links');
  }
  else if(isAuthenticatedPage && !isAuthenticated){
    history.replace('/');
  }

});


Meteor.startup(() => {
  ReactDOM.render(<Routes />, document.getElementById('app'));
});