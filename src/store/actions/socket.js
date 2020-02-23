import * as actionTypes from '../actions/actionTypes';

export const connectSocketActionCreator = () => {
    return {
        type: actionTypes.CONNECT_SOCKET,
    }
}

export const disconnectSocketActionCreator = () => {
    return {
        type: actionTypes.DISCONNECT_SOCKET,
    }
}