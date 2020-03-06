import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from '../../styles';

const DrawerButton = (props) => {
    const classes = useStyles();
    return (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={classes.menuButton}
        >
            <MenuIcon />
        </IconButton>
    )
}

export default DrawerButton;