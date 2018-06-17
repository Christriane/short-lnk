import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Login from '../imports/ui/Login';
import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';

export const history = createHistory();

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
    <Route path="/" component={Login} exact={true}/>
    <Route path="/signup" component={Signup} />
    <Route path="/links" component={Link} />
    <Route path="*" component={NotFound} />
  </Switch>
</Router>
);


Meteor.startup(() => {
  ReactDOM.render(<Routes />, document.getElementById('app'));
});