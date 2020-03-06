import React, { useEffect } from 'react';
import { List, CircularProgress } from '@material-ui/core';
import VisibilitySensor from 'react-visibility-sensor';

import MessageItem from './MessageItem/MessageItem';
import useStyles from '../../styles';

const MessageItems = (props) => {
    const classes = useStyles();

    const loadPrevMessages = (isVisible = true) => {
        if (!props.fetching && isVisible) {
            props.fetchPreviousMessages();
        }
    }

    useEffect(() => {
        loadPrevMessages();
    }, [])

    let lastMessageDate = null;
    return (
        <List className={[classes.messagesList, 'type-messages'].join(' ')}>
            <VisibilitySensor
                onChange={(isVisible) => loadPrevMessages(isVisible)}
                offset={{ top: 10 }}
                delayedCall={true} >
                <li className={classes.topLiFetching} >
                    {props.fetching ? <CircularProgress disableShrink /> : null}
                </li>
            </VisibilitySensor>
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
