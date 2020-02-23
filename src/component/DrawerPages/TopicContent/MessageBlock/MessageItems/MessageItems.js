import React, { useEffect } from 'react';
import { List, CircularProgress, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import MessageItem from './MessageItem/MessageItem';
import useStyles from '../../styles';
import { findDOMNode } from 'react-dom';
import * as messageTypes from '../../../../../utility/message-types';
import { readMessageAction } from '../../../../../store/actions/messages';

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
    
    const firstNotReaded = (messageIndex, arrayLength) => {
        const reverseMessageIndex = arrayLength - messageIndex;
        return reverseMessageIndex === props.newMessagesLabelPosition && props.newMessagesLabelPosition !== 0;
    }

    const notReadedElement = (messageIndex, arrayLength) => {
        return firstNotReaded(messageIndex, arrayLength)
            ? <li className={[classes.newMessagesBlock, 'not-readed-message'].join(' ')}>New messages</li>
            : null;
    }

    let lastMessageDate = null;
    const messagesCount = props.topics[props.currTopicId].messages.length;
    return (
        <List className={[classes.messagesList, 'messages'].join(' ')}>
            <li ref={(node) => { topRef = node }} className={classes.topLiFetching} >
                {props.fetching ? <CircularProgress disableShrink /> : null}
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
                                {notReadedElement(index, messagesCount)}
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
                                    userId={props.userId}
                                    addToReaded={props.addToReaded}
                                    selectedMessagesId={props.selectedMessagesId}
                                    showAuthor={firstNotReaded(index, messagesCount)}
                                    changeSelectedMessage={props.changeSelectedMessage.bind(this, item._id)} />
                            </React.Fragment>
                        )
                    }

                    const [prevType, prevAuthor] = index !== 0 ? [
                        props.topics[props.currTopicId].messages[index - 1].type,
                        props.topics[props.currTopicId].messages[index - 1].creatorId._id,
                    ] : null;

                    return (
                        <React.Fragment key={item._id}>
                            {notReadedElement(index, messagesCount)}
                            <MessageItem
                                message={item}
                                userId={props.userId}
                                addToReaded={props.addToReaded}
                                prevType={prevType}
                                prevAuthor={prevAuthor}
                                selectedMessagesId={props.selectedMessagesId}
                                showAuthor={firstNotReaded(index, messagesCount)}
                                changeSelectedMessage={props.changeSelectedMessage.bind(this, item._id)} />
                        </React.Fragment>
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
        userId: state.auth.id,
        currTopicId: state.tpc.openedTopicId,
        savingMessages: state.msg.savingMessages,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToReaded: (userId, messageId) => { dispatch(readMessageAction(userId, messageId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageItems);
