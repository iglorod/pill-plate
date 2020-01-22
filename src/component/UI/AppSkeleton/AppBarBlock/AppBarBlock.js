import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import useStyle from '../style';

const AppBarBlock = (props) => {
    const classes = useStyle();

    return (
        <AppBar position="fixed" className={classes.appBar} color={'inherit'}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>Some text</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AppBarBlock;