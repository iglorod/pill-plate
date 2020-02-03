import axios from 'axios';

import * as actionTypes from './actionTypes';

const errorActionCreator = (error) => {
    return {
        type: actionTypes.AUTH_ERROR,
        err: error
    }
}

const signUpActionCreator = (token) => {
    return {
        type: actionTypes.SIGN_UP,
        token: token
    }
}

export const signUpAction = (user) => {
    return dispatch => {
        axios.post('http://localhost:4000/user/signup', user)
            .then(token => {
                dispatch(signUpActionCreator(token));
            })
            .catch(err => {
                dispatch(errorActionCreator(err))
            });
    }
}

const signInActionCreator = (token) => {
    return {
        type: actionTypes.SIGN_IN,
        token: token
    }
}

export const signInAction = (user) => {
    return dispatch => {
        axios.post('http://localhost:4000/user/signin', user)
            .then(token => {
                dispatch(signInActionCreator(token));
            })
            .catch(err => {
                dispatch(errorActionCreator(err))
            });
    }
}