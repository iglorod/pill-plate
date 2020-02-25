import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import axios from '../../../../utility/axios-instance';

import useStyles from '../styles';
import MessageItems from './MessageItems/MessageItems';
import EmptyMessages from './EmptyMessages/EmptyMessages';
import LoadMessages from './LoadMessages/LoadMessages';
import { fetchMessagesAction } from '../../../../store/actions/messages';

const scrollToTopPosition = (topPosition, parent, delay = 0) => {
    $(parent).animate({ scrollTop: topPosition }, delay)
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
    const [newMessagesLabelPosition, setNewMessagesLabelPosition] = useState(0);
    const [firstFetching, setFirstFetching] = useState(true);

    useEffect(() => {
        if (props.currTopicId) {
            axios.post('/topic/messages/single/readers/' + props.currTopicId, { userId: props.userId })
                .then(count => {
                    setNewMessagesLabelPosition(count.data);

                    let displayCount = count.data;
                    displayCount += 5;
                    if (displayCount < 15) displayCount += 15 - displayCount;    //prepend 5 messages to unreaded messages
                    loadMessagesHistory(displayCount, true).then(() => {
                        firstFetchingScroll();
                    });
                })
        }
    }, [props.currTopicId])

    useEffect(() => {
        if (props.savingMessages === true) savingMessageScroll();
        else {
            setNewMessagesLabelPosition(0);
            props.changeProgress(0);
            setTimeout(() => savingMessageScroll(), 300);
        }
    }, [props.savingMessages])

    useEffect(() => {
        if (props.recivingMessage === false) {
            setNewMessagesLabelPosition(0);
            setTimeout(() => savingMessageScroll(), 300);
        }
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
        setFirstFetching(false);

        let messages = document.querySelector(".messages");
        let message = document.querySelector(".messages .not-readed-message");
        let goBack = 110;

        if (!message) {
            goBack = 0;
            message = document.querySelector(".messages .message:last-of-type");
        }

        setTimeout(() => {
            if (message) {
                scrollToTopPosition(getTopPostion(message) - goBack, messages, 300);
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
        if (!firstMessage) return;

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

    let messages = <EmptyMessages />
    if (topicIsExist(props.topic)) {
        messages = <MessageItems
            fetchPreviousMessages={fetchPreviousMessages}
            fetching={fetching}
            loadingFileProgress={props.loadingFileProgress}
            changeSelectedMessage={props.changeSelectedMessage}
            selectedMessagesId={props.selectedMessagesId}
            filter={props.filter}
            newMessagesLabelPosition={newMessagesLabelPosition} />
    }

    if (firstFetching) messages = <LoadMessages />

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
