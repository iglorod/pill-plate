import React, { useState, useRef } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
    IconButton,
    Menu,
    MenuItem,
    Fade
} from '@material-ui/core';

import useStyles from '../../../styles';

const TopicMenu = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const closeAndEdit = () => {
        handleClose();
        props.dialogOpen();
    }

    return (
        <React.Fragment>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                className={classes.topicMenuButton}
                disableRipple={true}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>Share topic</MenuItem>
                <MenuItem onClick={closeAndEdit}>Edit name</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default TopicMenu;
