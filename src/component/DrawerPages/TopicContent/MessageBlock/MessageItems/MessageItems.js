import React, { useEffect } from 'react';
import { List, CircularProgress, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import MessageItem from './MessageItem/MessageItem';
import useStyles from '../../styles';
import { findDOMNode } from 'react-dom';
import * as messageTypes from '../../../../../utility/message-types';

const filterCheck = (message, filter) => {
    if (!filter.photos && !filter.links && !filter.videos && !filter.files) return true;

    if (message.type === messageTypes.IMAGE && filter.photos === true) return true;
    if (message.type === messageTypes.LINK && filter.links === true) return true;
    if (message.type === messageTypes.VIDEO && filter.videos === true) return true;
    if (message.type === messageTypes.FILE && filter.files === true) return true;

    return false;
}

const MessageItems = (props) => {
    const classes = useStyles();
    
    let topRef = null;
    useEffect(() => {
        let observer = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting === true) {
                if (!props.fetching) {
                    props.fetchPreviousMessages();
                }
            }
        }, { threshold: [1] });

        observer.observe(findDOMNode(topRef));
    }, [])

    let lastMessageDate = null;
    return (
        <List className={[classes.messagesList, 'messages'].join(' ')}>
            <li
                ref={(node) => { topRef = node }}
                className={classes.topLiFetching}
            >
                {props.fetching ? <CircularProgress /> : null}
            </li>
            {
                props.topics[props.currTopicId].messages.map((item, index) => {
                    if (!filterCheck(item, props.filter)) return null;

                    const currentMessageDate = new Date(item.date * 1000).toLocaleDateString();

                    if (lastMessageDate !== currentMessageDate) {
                        lastMessageDate = currentMessageDate;

                        const shownTimeString = new Date(item.date * 1000).toDateString();

                        return (
                            <React.Fragment key={item._id}>
                                <li
                                    style={
                                        {
                                            textAlign: 'center',
                                            color: 'grey',
                                            paddingTop: '20px',
                                        }
                                    }>{shownTimeString}</li>
                                <MessageItem
                                    message={item}
                                    selectedMessagesId={props.selectedMessagesId}
                                    changeSelectedMessage={props.changeSelectedMessage.bind(this, item._id)} />
                            </React.Fragment>
                        )
                    }

                    const [prevType, prevAuthor] = index !== 0 ? [
                        props.topics[props.currTopicId].messages[index - 1].type,
                        props.topics[props.currTopicId].messages[index - 1].creatorId._id,
                    ] : null;

                    return (
                        <MessageItem
                            key={item._id}
                            message={item}
                            prevType={prevType}
                            prevAuthor={prevAuthor}
                            selectedMessagesId={props.selectedMessagesId}
                            changeSelectedMessage={props.changeSelectedMessage.bind(this, item._id)} />
                    )
                })
            }
            <li style={{ textAlign: 'center', padding: '0 10%' }} className={'message'}>
                {props.savingMessages
                    ? <LinearProgress variant="determinate" value={props.loadingFileProgress} />
                    : null}
            </li>
        </List>
    )
}

const mapStateToProps = (state) => {
    return {
        topics: state.msg.topics,
        fetching: state.msg.fetchingMessages,
        userId: state.auth.id,
        currTopicId: state.tpc.openedTopicId,
        savingMessages: state.msg.savingMessages,
    }
}

export default connect(mapStateToProps)(MessageItems);
