import React, { useEffect } from 'react';
import { List, CircularProgress } from '@material-ui/core';

import MessageItem from './MessageItem/MessageItem';
import useStyles from '../../styles';
import { findDOMNode } from 'react-dom';

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
        <List className={[classes.messagesList, 'type-messages'].join(' ')}>
            <li
                ref={(node) => { topRef = node }}
                className={[classes.topLiFetching, 'message'].join(' ')}
            >
                {props.fetching ? <CircularProgress /> : null}
            </li>
            {
                props.filterMessages.map((item, index) => {
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
                                <MessageItem message={item} />
                            </React.Fragment>
                        )
                    }
                    return (
                        <MessageItem
                            key={item._id}
                            message={item} />
                    )
                })
            }
        </List>
    )
}

export default MessageItems;
