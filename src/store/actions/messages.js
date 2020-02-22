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

export const startMessageReciveActionCreator = () => {
    return {
        type: actionTypes.START_MESSAGES_RECIVE,
    }
}

export const finishMessageReciveActionCreator = () => {
    return {
        type: actionTypes.FINISH_MESSAGES_RECIVE,
    }
}

export const saveMessageActionCreator = (message) => {
    return {
        type: actionTypes.MESSAGE_SAVE,
        message: message,
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

export const editRecivedMessageActionCreator = (message) => {
    return {
        type: actionTypes.EDIT_MESSAGE,
        message: message,
    }
}

export const removeRecivedMessageActionCreator = (message) => {
    return {
        type: actionTypes.REMOVE_MESSAGE,
        message: message,
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

export const fetchMessagesAction = (data) => {
    return dispatch => {
        dispatch(startMessageFetchActionCreator());

        const limitations = '?skip=' + data.skip + '&limit=' + data.limit;

        axios.get('http://localhost:4000/topic/messages/' + data.currTopicId + limitations)
            .then(messages => {
                dispatch(finishMessageFetchActionCreator());

                if (messages.data.length < 15) data.setAllowToFetch(false);
                dispatch(fetchMessagesActionCreator(messages.data.reverse(), data.currTopicId));

                data.setSkip(prevState => prevState + 15);
                data.resolve();
            })
            .catch(err => {
                dispatch(errorActionCreator(err));
            });
    }
}

export const editMessageAction = (message, socket, editableMessageId) => {
    return (dispatch, getState) => {
        const topicId = getState().tpc.openedTopicId;

        axios.patch('http://localhost:4000/topic/messages/single/' + editableMessageId, message)
            .then(message => {
                socket.emit('edit-message', topicId, message.data);
            })
            .catch(err => {
                dispatch(errorActionCreator(err));
            });
    }
}

export const removeMessageAction = (messageId, socket) => {
    return (dispatch, getState) => {
        const topicId = getState().tpc.openedTopicId;

        axios.delete('http://localhost:4000/topic/messages/single/' + messageId)
            .then(message => {
                socket.emit('delete-message', topicId, message.data);
            })
            .catch(err => {
                dispatch(errorActionCreator(err));
            });
    }
}

export const saveMessageAction = (message) => {
    return dispatch => {
        dispatch(startMessageReciveActionCreator());
        dispatch(saveMessageActionCreator(message))
        dispatch(finishMessageReciveActionCreator());
    }
}
