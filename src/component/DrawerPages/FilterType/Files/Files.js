import React from 'react';
import { connect } from 'react-redux';

import FilterMessages from '../FilterMessages/FilterMessages';
import useStyles from '../../TopicContent/styles';

const Files = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FilterMessages
                fetchType={'file'}
                idUser={props.idUser}
                token={props.token} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        idUser: state.auth.id,
        token: state.auth.token,
    }
}

export default connect(mapStateToProps)(Files);
