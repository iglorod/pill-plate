import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
    IconButton,
    Menu,
    MenuItem,
    Fade,
    Snackbar
} from '@material-ui/core';
import { connect } from 'react-redux';

import useStyles from '../../../styles';
import { leaveTopicAction } from '../../../../../../store/actions/topics';

const TopicMenu = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const closeAndEdit = () => {
        handleClose();
        props.edtiDialogOpen();
    }

    const closeAndLeave = () => {
        handleClose();
        props.leaveTopic(props.topic._id, handleOpenSnackbar, props.socket);
    }

    const closeAndShare = () => {
        handleClose();
        props.shareDialogOpen();
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
                <MenuItem onClick={closeAndShare}>Share topic</MenuItem>
                <MenuItem onClick={closeAndEdit}>Edit name</MenuItem>
                <MenuItem onClick={closeAndLeave}>Leave</MenuItem>
            </Menu>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                message={'Topic was leaved'}
            />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        socket: state.sckt.socket,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        leaveTopic: (topicId, handleOpenSnackbar, socket) => { dispatch(leaveTopicAction(topicId, handleOpenSnackbar, socket)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicMenu);
