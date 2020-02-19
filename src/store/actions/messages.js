import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';
import * as fileTypeCheck from '../../utility/filetype-check';
import * as messageTypes from '../../utility/message-types';

export const errorActionCreator = (error) => {
    return {
        type: actionTypes.MESSAGE_ERROR,
        err: error
    }
}

export const saveMessageActionCreator = (message) => {
    return {
        type: actionTypes.MESSAGE_SAVE,
        message: message,
    }
}

export const startMessageFetchActionCreator = () => {
    return {
        type: actionTypes.START_MESSAGES_FETCHING,
    }
}

export const finishMessageFetchActionCreator = () => {
    return {
        type: actionTypes.FINISH_MESSAGES_FETCHING,
    }
}

export const fetchMessagesActionCreator = (messages, topicId) => {
    return {
        type: actionTypes.FETCH_MESSAGES,
        messages: messages,
        topicId: topicId,
    }
}

export const startSendingMessageActionCreator = () => {
    return {
        type: actionTypes.START_MESSAGES_SAVING,
    }
}

export const finishSendingMessageActionCreator = () => {
    return {
        type: actionTypes.FINISH_MESSAGES_SAVING,
    }
}

export const sendTextMessageAction = (message, socket, messageType) => {
    return (dispatch, getState) => {
        const messageData = {
            creatorId: message.sender,
            text: message.text,
            type: messageType,
        }

        const topicId = getState().tpc.openedTopicId;

        axios.post('http://localhost:4000/topic/messages/text/' + topicId, messageData)
            .then(message => {
                socket.emit('save-message', topicId, message.data);
            })
            .catch(err => {
                dispatch(errorActionCreator(err));
            });
    }
}

export const sendFileMessageAction = (message, socket, changeProgress) => {
    return (dispatch, getState) => {
        dispatch(startSendingMessageActionCreator());
        let formData = new FormData();

        const filename = message.file.name;

        let fileType = messageTypes.FILE;
        if (fileTypeCheck.isImage(filename)) {
            formData.append('image', message.file, message.file.name);
            formData.append('type', messageTypes.IMAGE);
            fileType = messageTypes.IMAGE;
        }
        else if (fileTypeCheck.isVideo(filename)) {
            formData.append('video', message.file, message.file.name);
            formData.append('type', messageTypes.VIDEO);
            fileType = messageTypes.VIDEO;
        }
        else {
            formData.append('file', message.file, message.file.name);
            formData.append('type', messageTypes.FILE);
        }

        formData.append('creatorId', message.sender);

        const topicId = getState().tpc.openedTopicId;

        axios.post('http://localhost:4000/topic/messages/' + fileType + '/' + topicId, formData, {
            onUploadProgress: progressEvent => {
                const progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
                changeProgress(progress);
            }
        })
            .then(message => {
                dispatch(finishSendingMessageActionCreator());
                socket.emit('save-message', topicId, message.data);
            })
            .catch(err => {
                dispatch(errorActionCreator(err));
            });
    }
}

export const fetchMessagesAction = (skip, limit, topicId) => {
    return dispatch => {
        dispatch(startMessageFetchActionCreator());

        const limitations = '?skip=' + skip + '&limit=' + limit;

        axios.get('http://localhost:4000/topic/messages/' + topicId + limitations)
            .then(messages => {
                dispatch(finishMessageFetchActionCreator());
                dispatch(fetchMessagesActionCreator(messages.data.reverse(), topicId));
            })
            .catch(err => {
                dispatch(errorActionCreator(err));
            });
    }
}
