import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import useStyles from '../styles';
import MessageItems from './MessageItems/MessageItems';
import EmptyMessage from './EmptyMessage/EmptyMessage';
import { fetchMessagesAction } from '../../../../store/actions/messages';

const scrollToTopPosition = (topPosition, parent) => {
    $(parent).animate({ scrollTop: (topPosition) }, 0)
}

const getTopPostion = (el) => {
    return $(el).offset().top
}

const topicIsExist = (topic) => {
    return topic && topic.messages;
}

const MessageBlock = (props) => {
    const classes = useStyles();

    const [fetching, setFetching] = useState(false);
    const [, setAllowToFetch] = useState(false);
    const [, setSkip] = useState(0);

    useEffect(() => {
        if (props.currTopicId) {
            loadMessagesHistory(15, true).then(() => {
                firstFetchingScroll();
            });
        }
    }, [props.currTopicId])

    useEffect(() => {
        if (props.savingMessages === true) savingMessageScroll();
        else {
            props.changeProgress(0);
            setTimeout(() => savingMessageScroll(), 300);
        }
    }, [props.savingMessages])

    useEffect(() => {
        if (props.recivingMessage === false) setTimeout(() => savingMessageScroll(), 300);
        else setSkip(prevState => prevState + 1);
    }, [props.recivingMessage])

    const getSkip = () => {
        let skip = null;
        setSkip(prevState => {
            skip = prevState;
            return prevState;
        });
        return skip;
    }

    const getLastAllowToFetch = () => {
        let allow = null;
        setAllowToFetch(prevState => {
            allow = prevState;
            return prevState;
        });
        return allow;
    }

    const getLastFetching = () => {
        let fetching = null;
        setFetching(prevState => {
            fetching = prevState;
            return prevState;
        });
        return fetching;
    }

    const firstFetchingScroll = () => {
        let messages = document.querySelector(".messages")
        let lastMessage = document.querySelector(".messages .message:last-of-type");
        setTimeout(() => {
            if (lastMessage) {
                scrollToTopPosition(getTopPostion(lastMessage), messages);
            }

            setAllowToFetch(true);
        }, 500)
    }

    const savingMessageScroll = () => {
        let lastMessage = document.querySelector(".messages .message:last-of-type");
        if (lastMessage) {
            lastMessage.scrollIntoView();
        }
    }

    const prevFetchingScroll = (firstMessage, oldFirstMessageTopPosition) => {
        const messages = document.querySelector(".messages");
        let newFirstMessageTopPosition = getTopPostion(firstMessage);

        if (firstMessage) {
            scrollToTopPosition(newFirstMessageTopPosition - oldFirstMessageTopPosition, messages);
        }
        setFetching(false);
    }

    const fetchPreviousMessages = () => {
        if (!getLastAllowToFetch() || getLastFetching()) return;
        const firstMessage = document.querySelectorAll(".messages .message")[1];
        let oldFirstMessageTopPosition = getTopPostion(firstMessage);

        setFetching(true);
        loadMessagesHistory(15).then(() => {
            if (!firstMessage) return;
            prevFetchingScroll(firstMessage, oldFirstMessageTopPosition);
        });
    }

    const loadMessagesHistory = (limit, isFirstLoad) => {
        return new Promise((resolve, reject) => {
            if (isFirstLoad && topicIsExist(props.topic)) {
                setSkip(props.topic.messages.length);
                resolve();
                return;
            }

            const data = {
                skip: getSkip(),
                limit,
                currTopicId: props.currTopicId,
                resolve,
                setAllowToFetch,
                setSkip,
            }
            props.fetchMessages(data);
        })
    }

    let messages = <EmptyMessage />
    if (topicIsExist(props.topic)) {
        messages = <MessageItems
            fetchPreviousMessages={fetchPreviousMessages}
            fetching={fetching}
            loadingFileProgress={props.loadingFileProgress}
            changeSelectedMessage={props.changeSelectedMessage}
            selectedMessagesId={props.selectedMessagesId}
            filter={props.filter} />
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
        savingMessages: state.msg.savingMessages,
        recivingMessage: state.msg.recivingMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessages: (data) => { dispatch(fetchMessagesAction(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBlock);
