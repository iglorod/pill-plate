import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import useStyles from './styles';

const Loading = (props) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={props.isLoading}>
            <CircularProgress color="primary" />
        </Backdrop>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.loading,
    }
}

export default connect(mapStateToProps)(Loading);