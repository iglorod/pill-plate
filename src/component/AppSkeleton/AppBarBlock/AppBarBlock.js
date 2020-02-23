import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { ExitToApp, MailOutline } from '@material-ui/icons';
import { connect } from 'react-redux';

import useStyle from '../style';
import AppBarLink from './AppBarLink/AppBarLink';
import DrawerButton from './MenuButton/MenuButton';
import { logoutActionCreator } from '../../../store/actions/authorization';
import { onLogoutMessagesClearActionCreator } from '../../../store/actions/messages';
import { disconnectSocketActionCreator } from '../../../store/actions/socket';
import { onLogoutTopicsClearActionCreator } from '../../../store/actions/topics';

const AppBarBlock = (props) => {
    const classes = useStyle();

    const logoutHandler = () => {
        props.logout();
        props.clearSocket();
        props.clearMessages();
        props.clearTopics();
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
        logout: () => { dispatch(logoutActionCreator()) },
        clearSocket: () => { dispatch(disconnectSocketActionCreator()) },
        clearMessages: () => { dispatch(onLogoutMessagesClearActionCreator()) },
        clearTopics: () => { dispatch(onLogoutTopicsClearActionCreator()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarBlock);
