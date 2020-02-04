import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import useStyle from './style';
import DrawerBlock from './DrawerBlock/DrawerBlock';
import AppBarBlock from './AppBarBlock/AppBarBlock';
import { finishLoadingActionCreator } from '../../store/actions/authorization';

//pages components
import Topics from '../DrawerPages/Topics/Topics';
import Links from '../DrawerPages/Links/Links';
import Photos from '../DrawerPages/Photos/Photos';
import Files from '../DrawerPages/Files/Files';
import Notes from '../DrawerPages/Notes/Notes';
import Draft from '../DrawerPages/Draft/Draft';
import NotFound from '../DrawerPages/4O4/NotFound';


const AppSceleton = (props) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        props.finishLoading();
    }, [])

    const classes = useStyle();

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
                <Switch>
                    <Route path={props.match.url + '/topics'} component={Topics} />

                    <Route path={props.match.url + '/links'} component={Links} />
                    <Route path={props.match.url + '/photos'} component={Photos} />
                    <Route path={props.match.url + '/files'} component={Files} />
                    <Route path={props.match.url + '/notes'} component={Notes} />

                    <Route path={props.match.url + '/draft'} component={Draft} />

                    <Route path={props.match.url} component={NotFound} />
                </Switch>
            </main>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        finishLoading: () => { dispatch(finishLoadingActionCreator()) }
    }
}

export default connect(null, mapDispatchToProps)(AppSceleton);