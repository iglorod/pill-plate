import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import useStyles from '../../styles';
import * as messageTypes from '../../../../../utility/message-types';
import { removeMessageAction } from '../../.././../../store/actions/messages';

const someIsSelected = (selectedsId) => {
    if (selectedsId.length > 0) return true;
    return false;
}

const selectedIsEditable = (selectedsId, messages) => {
    if (selectedsId.length !== 1) return false;
    const isEditable = selectedsId.reduce((editable, item) => {
        const message = messages.find(message => message._id === item);

        if (!message) return editable;

        if (message.type === messageTypes.TEXT || message.type === messageTypes.LINK)
            return editable && true;
        else
            return editable && false;
    }, true)

    return isEditable;
}

const MessageActions = (props) => {
    const classes = useStyles();

    const [content, setContent] = useState([]);

    const editMessageHandler = (event) => {
        event.stopPropagation();
        props.editingMessageStart();
    }

    const removeMessageHandler = (event) => {
        event.stopPropagation();

        props.selectedMessagesId.map(messageId => {
            return props.removeMessage(messageId, props.socket);
        })
        
        props.clearSelectedMessages();
    }

    const deleteButton = <Button
        key={'delete'}
        size="small"
        color={'secondary'}
        className={classes.deleteButton}
        onClick={removeMessageHandler} >Delete</Button>

    const editButton = <Button
        key={'edit'}
        size="small"
        className={classes.editButton}
        onClick={editMessageHandler} >Edit</Button>

    useEffect(() => {
        const buttons = [];
        if (props.topic && selectedIsEditable(props.selectedMessagesId, props.topic.messages)) {
            buttons.push(editButton);
        }
        if (props.topic && someIsSelected(props.selectedMessagesId)) {
            buttons.push(deleteButton);
        }

        setContent([...buttons]);
    }, [props.topic, props.selectedMessagesId])

    return (
        <div className={classes.messageActionsBlock}>
            {content}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        topic: state.msg.topics[state.tpc.openedTopicId],
        socket: state.sckt.socket,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeMessage: (messageId, socket) => { dispatch(removeMessageAction(messageId, socket)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageActions);
