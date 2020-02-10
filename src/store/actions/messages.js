import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const errorActionCreator = (error) => {
    return {
        type: actionTypes.MESSAGE_ERROR,
        err: error
    }
}

export const saveTextMessageActionCreator = (message) => {
    return {
        type: actionTypes.TEXT_MESSAGE_SAVE,
        message: message,
    }
}

export const sendTextMessageAction = (message, socket) => {
    return (dispatch, getState) => {
        const messageData = {
            creatorId: message.sender,
            text: message.text,
            type: 'text',
        }

        const topicId = getState().tpc.openedTopicId;

        axios.post('http://localhost:4000/topic/messages/' + topicId, messageData)
            .then(message => {
                socket.emit('save-text-message', topicId, message.data);
            })
            .catch(err => {
                dispatch(errorActionCreator(err));
            });
    }
}

