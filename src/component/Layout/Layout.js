import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppSceleton from '../UI/AppSkeleton/AppSceleton';
import SignIn from '../Authorization/SignIn/SignIn';
import SignUp from '../Authorization/SignUp/SignUp';

const layout = () => {
  return (
    <Switch>
      <Route path="/sign-in" component={SignIn} exact />
      <Route path="/sign-up" component={SignUp} exact />
      <Route path="/us" component={AppSceleton} />
      <Route path="/" render={() => <Redirect to="/us" />} />
    </Switch>
  )
}

export default layout;
