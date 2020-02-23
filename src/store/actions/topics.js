import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const fetchingStartActionCreator = () => {
    return {
        type: actionTypes.START_FETCHING
    }
}

export const errorActionCreator = () => {
    return {
        type: actionTypes.TOPICS_ERROR
    }
}

export const getTopicsActionCreator = (topics, socket) => {
    return {
        type: actionTypes.FINISH_FETCHING,
        topics: topics,
        socket: socket,
    }
}

export const createTopicActionCreator = (topic, socket) => {
    return {
        type: actionTypes.ADD_TOPIC,
        topic: topic,
        socket: socket,
    }
}

export const editTopicActionCreator = (topic, handleOpenSnackbar) => {
    handleOpenSnackbar();

    return {
        type: actionTypes.EDIT_TOPIC,
        topic: topic
    }
}

export const setCurrentTopicActionCreator = (topicId) => {
    return {
        type: actionTypes.SET_CURRENT_TOPIC,
        topicId: topicId
    }
}

export const leaveTopicActionCreator = (topicId, socket) => {
    return {
        type: actionTypes.DELETE_TOPIC,
        topicId: topicId, 
        socket: socket,
    }
}

export const onLogoutTopicsClearActionCreator = () => {
    return {
        type: actionTypes.LOGOUT_TOPICS,
    }    
}

export const getTopicsAction = (socket) => {
    return (dispatch, getState) => {
        dispatch(fetchingStartActionCreator());

        const userId = getState().auth.id;
        const token = getState().auth.token;

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.get('http://localhost:4000/topics/' + userId)
            .then(topics => {
                dispatch(getTopicsActionCreator(topics.data, socket));
            })
            .catch(error => dispatch(errorActionCreator()))
    }
}

export const createTopicAction = (topic, socket, handleOpenSnackbar) => {
    return (dispatch, getState) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getState().auth.token;
        axios.post('http://localhost:4000/topics', topic)
            .then(topic => {
                dispatch(createTopicActionCreator(topic.data, socket));
                handleOpenSnackbar();
            })
            .catch(error => dispatch(errorActionCreator()))
    }
}

export const editTopicAction = (topic) => {
    return (dispatch, getState) => {
        const updatedData = {
            name: topic.name,
            note: topic.note,
        }

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getState().auth.token;
        axios.patch('http://localhost:4000/topics/single/' + topic._id, updatedData)
            .catch(error => dispatch(errorActionCreator()))
    }
}

export const leaveTopicAction = (topicId, handleOpenSnackbar, socket) => {
    return (dispatch, getState) => {
        const userId = getState().auth.id

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getState().auth.token;
        axios.post('http://localhost:4000/topics/single/leave/' + topicId, { userId })
            .then(res => {
                dispatch(leaveTopicActionCreator(topicId, socket));
                handleOpenSnackbar();
            })
            .catch(error => dispatch(errorActionCreator()))
    }
}
