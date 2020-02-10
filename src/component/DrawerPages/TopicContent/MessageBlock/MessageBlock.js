import React from 'react';
import { connect } from 'react-redux';

import useStyles from '../styles';
import MessageItems from './MessageItems/MessageItems';
import EmptyMessage from './EmptyMessage/EmptyMessage';

const MessageBlock = (props) => {
    const classes = useStyles();

    let messages = <EmptyMessage />
    if (props.topic !== undefined) {
        messages = <MessageItems topic={props.topic} />
    }

    return (
        <div className={classes.messagesBlock}>
            {messages}
        </div>
    )
}

const mapStateToProps = (state) => {
    const currTopic = state.tpc.openedTopicId;
    return {
        topic: state.msg[currTopic],
    }
}

export default connect(mapStateToProps)(MessageBlock);