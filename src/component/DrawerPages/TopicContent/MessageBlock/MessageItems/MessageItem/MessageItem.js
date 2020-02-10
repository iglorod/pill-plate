import React from 'react';
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    ListItemSecondaryAction,
    IconButton,
    Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const MessageItem = (props) => {

    const humanDate = new Date(props.message.date * 1000).toLocaleDateString();  

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="LETTER">{props.message.creatorId.email.slice(0, 2)}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.message.creatorId.email}
                secondary={props.message.text}
            />
            <ListItemSecondaryAction>
                <Typography variant="caption" display="block" gutterBottom>{humanDate}</Typography>
               { /*<IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>*/}
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default MessageItem;
