import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import LoginIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/MailOutline';

import useStyle from '../style';
import AppBarLink from './AppBarLink/AppBarLink';
import DrawerButton from './DrawerButton/DrawerButton';

const AppBarBlock = (props) => {
    const classes = useStyle();

    return (
        <AppBar position="fixed" className={classes.appBar} color={'inherit'}>
            <Toolbar>
                <DrawerButton handleDrawerToggle={props.handleDrawerToggle} />
                <div style={{ marginLeft: 'auto' }}>
                    <AppBarLink text='Contact us' icon={<MailIcon />} link='us/contact-us' />
                    <AppBarLink text='Log in' icon={<LoginIcon />} link='/sign-in' />
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default AppBarBlock;