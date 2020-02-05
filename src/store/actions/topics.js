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