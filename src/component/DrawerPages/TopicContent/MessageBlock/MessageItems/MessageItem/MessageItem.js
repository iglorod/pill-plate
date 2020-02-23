import React from 'react';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemSecondaryAction,
    Typography,
    ListItemIcon
} from '@material-ui/core';
import { CheckCircle, FiberManualRecord } from '@material-ui/icons';
import VisibilitySensor from 'react-visibility-sensor';

import useStyles from '../../../styles';
import * as messageTypes from '../../../../../../utility/message-types';
import TextItem from './TextItem/TextItem';
import LinkItem from './LinkItem/LinkItem';
import FileItem from './FileItem/FileItem';
import ImageItem from './ImageItem/ImageItem';
import VideoItem from './VideoItem/VideoItem';

const displayedDataByType = (message, show) => {
    if (message.type === messageTypes.TEXT) {
        return <TextItem message={message} showName={show} />
    }
    if (message.type === messageTypes.LINK) {
        return <LinkItem message={message} showName={show} />
    }
    else if (message.type === messageTypes.FILE)
        return <FileItem message={message} showName={show} />

    else if (message.type === messageTypes.IMAGE)
        return <ImageItem message={message} showName={show} />

    return <VideoItem message={message} showName={show} />
}

const setListItemClasses = (classes, showAuthor, selectedMessages, messageId) => {
    const listClasses = [classes.messageLiItem];
    if (!showAuthor) {
        listClasses.push(classes.messageLiWithAuthor);
    }
    if (selectedMessages.includes(messageId)) {
        listClasses.push(classes.messageLiSelected);
    }

    return listClasses;
}

const MessageItem = (props) => {
    const classes = useStyles();
    const humanDate = new Date(props.message.date * 1000).toLocaleTimeString();

    let showAuthor = false;

    if (
        props.prevType !== props.message.type
        || props.prevAuthor !== props.message.creatorId._id
        || props.showAuthor
    ) {
        showAuthor = true;
    }

    const dataComponent = displayedDataByType(props.message, showAuthor);

    const listClasses = setListItemClasses(classes, showAuthor, props.selectedMessagesId, props.message._id);

    const isVisibleHandler = () => {
        setTimeout(() => {
            props.addToReaded(props.userId, props.message._id);
        }, 500);
    }

    return (
        <ListItem
            alignItems="flex-start"
            className={listClasses.join(' ')}
            onClick={props.changeSelectedMessage}
            ContainerProps={{
                className: 'message'
            }}
        >
            {
                (props.selectedMessagesId.includes(props.message._id))
                    ? <ListItemIcon className={classes.isChecked}>
                        <CheckCircle />
                    </ListItemIcon>
                    : null
            }

            {
                !props.message.wasReadedBy.includes(props.userId) ?
                    <ListItemIcon className={classes.isChecked}>
                        <VisibilitySensor onChange={isVisibleHandler}>
                            <FiberManualRecord className={classes.notReadedDot} />
                        </VisibilitySensor>
                    </ListItemIcon>
                    : null
            }
            <ListItemAvatar>
                {
                    showAuthor
                        ? <Avatar alt="LETTER" className={classes.avatarStyle}>{props.message.creatorId.email.slice(0, 2)}</Avatar>
                        : <div></div>
                }
            </ListItemAvatar>
            {dataComponent}
            <ListItemSecondaryAction className={classes.messageSecondaryAction}>
                <Typography variant="caption" display="block" gutterBottom>{humanDate}</Typography>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default MessageItem;
