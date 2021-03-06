import React from 'react';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemSecondaryAction,
    Typography,
} from '@material-ui/core';

import useStyles from '../../../styles';
import * as messageTypes from '../../../../../../utility/message-types';
import TextItem from './TextItem/TextItem';
import LinkItem from './LinkItem/LinkItem';
import FileItem from './FileItem/FileItem';
import ImageItem from './ImageItem/ImageItem';
import VideoItem from './VideoItem/VideoItem';

const displayedDataByType = (message) => {
    if (message.type === messageTypes.TEXT) {
        return <TextItem message={message} showName={true} />
    }
    if (message.type === messageTypes.LINK) {
        return <LinkItem message={message} showName={true} />
    }
    else if (message.type === messageTypes.FILE)
        return <FileItem message={message} showName={true} />

    else if (message.type === messageTypes.IMAGE)
        return <ImageItem message={message} showName={true} />

    return <VideoItem message={message} showName={true} />
}

const MessageItem = (props) => {
    const classes = useStyles();
    const humanDate = new Date(props.message.date * 1000).toLocaleTimeString();

    const dataComponent = displayedDataByType(props.message);

    const listClasses = [classes.messageLiItem, classes.messageLiWithAuthor];

    return (
        <ListItem
            alignItems="flex-start"
            className={listClasses.join(' ')}
            ContainerProps={{
                className: 'message'
            }}
        >
            <ListItemAvatar>
                <Avatar alt="LETTER" className={classes.avatarStyle}>{props.message.creatorId.email.slice(0, 2)}</Avatar>
            </ListItemAvatar>
            {dataComponent}
            <ListItemSecondaryAction className={classes.messageSecondaryAction}>
                <Typography variant="caption" display="block" gutterBottom>{humanDate}</Typography>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default MessageItem;
