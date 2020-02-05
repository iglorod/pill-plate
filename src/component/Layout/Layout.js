import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppSceleton from '../AppSkeleton/AppSceleton';
import SignIn from '../Authorization/SignIn/SignIn';
import SignUp from '../Authorization/SignUp/SignUp';
import Loading from '../UI/Loading/Loading';
import { signInLocalAction, refreshTokenAction } from '../../store/actions/authorization';
import AnimatedSwitch from '../UI/AnimatedSwitch/AnimatedSwitch';

const Layout = (props) => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const expiresIn = localStorage.getItem('expirationTime') - 30;

      if (+Math.floor((new Date().getTime() / 1000)) >= expiresIn) {
        const token = {
          token: localStorage.getItem('token')
        }

        props.refreshTokenAndSignIn(token);
      } else {
        props.signInByLocalData();
      }
    }
  }, [])

  if (props.userId) {
    return (
      <React.Fragment>
        <Loading />
        <AnimatedSwitch>
          <Route path="/pulp" component={AppSceleton} />
          <Route path="/" render={() => <Redirect to="/pulp" />} />
        </AnimatedSwitch>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Loading />
      <AnimatedSwitch>
        <Route path="/sign-in" component={SignIn} exact />
        <Route path="/sign-up" component={SignUp} exact />
        <Route path="/" render={() => <Redirect to="/sign-in" />} />
      </AnimatedSwitch>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInByLocalData: () => { dispatch(signInLocalAction()) },
    refreshTokenAndSignIn: (token) => { dispatch(refreshTokenAction(token)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);