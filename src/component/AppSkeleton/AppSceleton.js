import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import DrawerBlock from './DrawerBlock/DrawerBlock';
import AppBarBlock from './AppBarBlock/AppBarBlock';
import { finishLoadingActionCreator } from '../../store/actions/authorization';
import { connectSocketActionCreator } from '../../store/actions/socket';
import AnimatedSwitch from '../UI/AnimatedSwitch/AnimatedSwitch';
import useStyles from './styles';

//pages components
import Topics from '../DrawerPages/Topics/Topics';
import Draft from '../DrawerPages/Draft/Draft';
import NotFound from '../DrawerPages/4O4/NotFound';

const AppSceleton = (props) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        props.finishLoading();
        props.connectSocket();
    }, [])

    const classes = useStyles();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarBlock handleDrawerToggle={handleDrawerToggle} />
            <DrawerBlock isMobile={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <AnimatedSwitch classProp={'pageComponentWrapper'}>
                    <Route path={props.match.url + '/topics'} component={Topics} />
                    <Route path={props.match.url + '/draft'} component={Draft} />
                    <Route path={props.match.url} component={NotFound} />
                </AnimatedSwitch>
            </main>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        finishLoading: () => { dispatch(finishLoadingActionCreator()) },
        connectSocket: () => { dispatch(connectSocketActionCreator()) },
    }
}

export default connect(null, mapDispatchToProps)(AppSceleton);