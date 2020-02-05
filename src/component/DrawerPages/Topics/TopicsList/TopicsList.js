import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import { getTopicsAction } from '../../../../store/actions/topics';
import useStyles from '../../styles';
import Topic from './Topic/Topic';

const TopicsList = (props) => {
    const classes = useStyles();

    useEffect(() => {
        if (props.topics.length === 0) props.getTopicsList();
    }, [])

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={3} className={classes.gridConatainer}>
                    {
                        props.topics.map((item, index) => {
                            return (
                                <Topic
                                    data={item}
                                    delay={index}
                                    key={index}
                                />
                            )
                        })
                    }
                </Grid>
            </div>
        </React.Fragment >
    )
}

const mapStateToProps = (state) => {
    return {
        topics: state.tpc.topics
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTopicsList: () => { dispatch(getTopicsAction()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsList);
