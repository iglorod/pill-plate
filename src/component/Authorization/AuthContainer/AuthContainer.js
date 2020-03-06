import React from 'react';
import { Avatar, CssBaseline, Box, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from '../styles';
import Copyright from '../../UI/Copyright/Copyright';

const AuthContainer = (props) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={classes.wrapper}>
            <CssBaseline />

            <div className={classes.paper}>
                <Avatar className={classes.avatar} pt={2}>
                    <LockOutlinedIcon />
                </Avatar>
                {props.children}
            </div>

            <Box mt={5} pb={2}>
                <Copyright />
            </Box>
        </Container >
    )
}

export default AuthContainer;