import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import { getTopicsAction } from '../../../../store/actions/topics';
import useStyles from '../styles';
import Topic from './Topic/Topic';
import EditTopicDialog from '../../../UI/Dialog/EditTopic';
import { saveMessageActionCreator } from '../../../../store/actions/messages';

const TopicsList = (props) => {
    const classes = useStyles();

    const [editTopicDialogOpen, setTopicDialogOpen] = useState(false);

    const [selectedTopicData, setSelectedTopicData] = useState(null);

    useEffect(() => {
        if (!props.wasFetched) {
            props.getTopicsList(props.socket);

            props.socket.on('recive-message', message => {
                props.reciveMessage(message);
            });
        }
    }, [])

    const dialogOpen = (topic) => {
        setSelectedTopicData(topic);
        setTopicDialogOpen(true);
    }

    const dialogClose = () => {
        setTopicDialogOpen(false);
        setSelectedTopicData(null);
    }

    return (
        <React.Fragment>
            <EditTopicDialog open={editTopicDialogOpen} handleClose={dialogClose} topic={selectedTopicData} />

            <div className={classes.root}>
                <Grid container spacing={3} className={classes.gridConatainer}>
                    {
                        props.topics.map((item, index) => {
                            return (
                                <Topic
                                    data={item}
                                    delay={index}
                                    key={index}
                                    dialogOpen={dialogOpen.bind(this, item)}
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
        socket: state.sckt.socket,
        topics: state.tpc.topics,
        wasFetched: state.tpc.wasFetched,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTopicsList: (socket) => { dispatch(getTopicsAction(socket)) },
        reciveMessage: (message) => { dispatch(saveMessageActionCreator(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsList);
