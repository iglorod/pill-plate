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

export const getTopicsActionCreator = (topics) => {
    return {
        type: actionTypes.FINISH_FETCHING,
        topics: topics
    }
}

export const createTopicActionCreator = (topic) => {
    return {
        type: actionTypes.ADD_TOPIC,
        topic: topic
    }
}

export const editTopicActionCreator = (topic) => {
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

export const getTopicsAction = () => {
    return (dispatch, getState) => {
        dispatch(fetchingStartActionCreator());

        const userId = getState().auth.id;
        const token = getState().auth.token;

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.get('http://localhost:4000/topics/' + userId)
            .then(topics => {
                dispatch(getTopicsActionCreator(topics.data));
            })
            .catch(error => dispatch(errorActionCreator()))
    }
}

export const createTopicAction = (topic) => {
    return (dispatch, getState) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getState().auth.token;
        axios.post('http://localhost:4000/topics', topic)
        .then(topic => {
            dispatch(createTopicActionCreator(topic.data));
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