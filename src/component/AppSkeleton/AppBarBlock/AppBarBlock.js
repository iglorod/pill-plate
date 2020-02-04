import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { ExitToApp, MailOutline, Face } from '@material-ui/icons';
import { connect } from 'react-redux';

import useStyle from '../style';
import AppBarLink from './AppBarLink/AppBarLink';
import DrawerButton from './DrawerButton/DrawerButton';
import { logoutActionCreator } from '../../../store/actions/authorization';

const AppBarBlock = (props) => {
    const classes = useStyle();

    const logoutHandler = () => {
        props.logout()
    }


    return (
        <AppBar position="fixed" className={classes.appBar} color={'inherit'}>
            <Toolbar>
                <DrawerButton handleDrawerToggle={props.handleDrawerToggle} />
                <div style={{ marginLeft: 'auto' }}>
                    <AppBarLink text='Contact us' icon={<MailOutline />} link='/pulp/contact-us' />
                    <AppBarLink text='Logout' icon={<ExitToApp />} link='/sign-in' logout={logoutHandler} />
                </div>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(logoutActionCreator()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarBlock);