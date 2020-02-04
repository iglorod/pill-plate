import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import { connect } from 'react-redux';

import AppSceleton from '../AppSkeleton/AppSceleton';
import SignIn from '../Authorization/SignIn/SignIn';
import SignUp from '../Authorization/SignUp/SignUp';
import Loading from '../UI/Loading/Loading';
import classes from './Layout.module.css';
import { signInLocalAction, refreshTokenAction } from '../../store/actions/authorization';

const mapStyles = (styles) => {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

const bounce = (val) => {
  return spring(val, {
    stiffness: 100,
    damping: 20,
  });
}

const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 0.8,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

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

  /*const isAuthNow = (Component) => {
    if (props.userId) return <Redirect to="/pulp" />
    return <Component />
  }*/
  if (props.userId) {
    return (
      <React.Fragment>
        <Loading />
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className={classes.switchWrapper}
        >
          <Route path="/pulp" component={AppSceleton} />
          <Route path="/" render={() => <Redirect to="/pulp" />} />
        </AnimatedSwitch>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Loading />
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className={classes.switchWrapper}
      >
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