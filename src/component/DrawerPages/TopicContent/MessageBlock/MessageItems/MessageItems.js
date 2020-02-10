import React, { useState } from 'react';
import { List } from '@material-ui/core';

import MessageItem from './MessageItem/MessageItem';

const MessageItems = (props) => {
    return (
        <List>
            {
                props.topic.messages.map(item => {
                    return (
                        <MessageItem key={item._id} message={item} />
                    )
                })
            }
        </List>
    )
}

export default MessageItems;
