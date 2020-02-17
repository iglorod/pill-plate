import React, { useEffect } from 'react';
import { List, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import MessageItem from './MessageItem/MessageItem';
import useStyles from '../../styles';
import { findDOMNode } from 'react-dom';

const MessageItems = (props) => {
    const classes = useStyles();

    useEffect(() => {
        const lastMessageAuthorId = props.topics[props.currTopicId].messages[props.topics[props.currTopicId].messages.length - 1].creatorId._id;
        const lastMessageTopicId = props.topics[props.currTopicId].messages[props.topics[props.currTopicId].messages.length - 1].topicId;

        if (lastMessageAuthorId === props.userId
            && lastMessageTopicId === props.currTopicId
            && props.allowScrollToBtm === true) {
            setTimeout(() => {
                props.scrollToBottom();
                props.setAllowScrollToBtm(false);
            }, 200);
        }
    }, [props.topics[props.currTopicId]]);

    let topRef = null;
    useEffect(() => {
        let observer = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting === true) {
                if (!props.fetching)
                    props.loadMessagesHistory();
            }
        }, { threshold: [1] });

        observer.observe(findDOMNode(topRef));
    }, [])

    let lastMessageDate = null;
    return (
        <List className={classes.messagesList}>
            <li
                ref={(node) => { topRef = node }}
                style={{ textAlign: 'center', padding: '30px 0', }}
            >
                {props.fetching ? <CircularProgress /> : null}
            </li>
            {
                props.topics[props.currTopicId].messages.map((item, index) => {
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
                                        }
                                    }>{shownTimeString}</li>
                                <MessageItem message={item} />
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
                            prevAuthor={prevAuthor} />
                    )
                })
            }
            {props.scrollToEl}
        </List>
    )
}

const mapStateToProps = (state) => {
    return {
        topics: state.msg.topics,
        fetching: state.msg.fetchingMessages,
        userId: state.auth.id,
        currTopicId: state.tpc.openedTopicId,
    }
}

export default connect(mapStateToProps)(MessageItems);
