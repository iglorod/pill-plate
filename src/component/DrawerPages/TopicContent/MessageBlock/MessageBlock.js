import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import useStyles from '../styles';
import MessageItems from './MessageItems/MessageItems';
import EmptyMessage from './EmptyMessage/EmptyMessage';
import { fetchMessagesAction } from '../../../../store/actions/messages';

const MessageBlock = (props) => {
    const classes = useStyles();

    const [, setMessagesCount] = useState(0);
    const [, setAllIsFetched] = useState(false);

    useEffect(() => {
        setMessagesCount((props.topic) ? props.topic.messages.length : 0);
    }, [(props.topic) ? props.topic.messages : null])

    useEffect(() => {
        setAllIsFetched((props.topic) ? props.topic.allIsFetched : false);
    }, [(props.topic) ? props.topic.allIsFetched : null])

    useEffect(() => {
        const fetchedCount = (props.topic) ? props.topic.messages.length : 0
        if (props.currTopicId && fetchedCount === 0)
            loadMessagesHistory();
    }, [props.currTopicId])

    const loadMessagesHistory = () => {
        let skip = 0;
        setMessagesCount(prevState => {     //props.topic.messages doesn't show update ones, therefore i use this approach
            skip = prevState;
            return prevState;
        })

        let allFetched = false;
        setAllIsFetched(prevState => {     //props.topic.allIsFetched doesn't show update ones, therefore i use this approach
            allFetched = prevState;
            return prevState;
        })

        if (!allFetched) {
            props.fetchMessages(skip, 15, props.currTopicId);
        }
    }

    let messages = <EmptyMessage />
    if (props.topic !== undefined) {
        messages = <MessageItems
            scrollToEl={props.scrollToEl}
            scrollToBottom={props.scrollToBottom}
            loadMessagesHistory={loadMessagesHistory} 
            allowScrollToBtm={props.allowScrollToBtm} 
            setAllowScrollToBtm={props.setAllowScrollToBtm}
            loadingFileProgress={props.loadingFileProgress} />
    }

    return (
        <div className={classes.messagesBlock}>
            {messages}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        topic: state.msg.topics[state.tpc.openedTopicId],
        currTopicId: state.tpc.openedTopicId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessages: (skip, limit, topicId) => { dispatch(fetchMessagesAction(skip, limit, topicId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBlock);
