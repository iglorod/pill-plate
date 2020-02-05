import axios from 'axios';

import * as actionTypes from './actionTypes';

const errorActionCreator = (error) => {
    return {
        type: actionTypes.AUTH_ERROR,
        err: error
    }
}

export const startActionCreator = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const finishLoadingActionCreator = () => {
    return {
        type: actionTypes.LOAD_FINISH
    }
}

export const signInActionCreator = (token, rememberData) => {
    return {
        type: actionTypes.SIGN_IN,
        token: token,
        remember: rememberData
    }
}

export const signUpActionCreator = (token) => {
    return {
        type: actionTypes.SIGN_UP,
        token: token
    }
}

export const signInLocalActionCreator = () => {
    return {
        type: actionTypes.SIGN_IN_LOCALY
    }
}

export const refreshTokenActionCreator = (token) => {
    return {
        type: actionTypes.REFRESH_TOKEN,
        token: token
    }
}

export const newTimeoutIdActionCreator = (timerId) => {
    return {
        type: actionTypes.RESET_TIMEOUT_ID,
        id: timerId
    }
}

export const logoutActionCreator = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const signInLocalAction = () => {
    return dispatch => {
        dispatch(signInLocalActionCreator());

        dispatch(resetTokenTimer());
    }
}

export const signUpAction = (user) => {
    return dispatch => {
        dispatch(startActionCreator());

        axios.post('http://localhost:4000/user/signup', user)
            .then(token => {
                dispatch(signUpActionCreator(token));
                dispatch(resetTokenTimer());
            })
            .catch(err => {
                dispatch(errorActionCreator(err))
            });
    }
}

export const signInAction = (user, rememberData) => {
    return dispatch => {
        dispatch(startActionCreator());

        axios.post('http://localhost:4000/user/signin', user)
            .then(token => {
                dispatch(signInActionCreator(token, rememberData));
                dispatch(resetTokenTimer());
            })
            .catch(err => {
                dispatch(errorActionCreator(err))
            });
    }
}

export const resetTokenTimer = () => { //set token auto-refreshing
    return (dispatch, getState) => {
        clearTimeout(getState().auth.refreshTimerId);

        let delay = (getState().auth.expirationTime - Math.floor((new Date().getTime() / 1000))) * 1000 - 30 * 1000;

        if (delay < 0) delay = 15 * 1000;

        const timerId = setTimeout(
            () => {
                const token = {
                    token: getState().auth.token
                }

                try {
                    dispatch(refreshTokenAction(token));
                } catch (error) {
                    console.log(error)
                }
            }, delay
        );
        dispatch(newTimeoutIdActionCreator(timerId));
    }
}

export const refreshTokenAction = (token) => {
    return (dispatch, getState) => {
        axios.post('http://localhost:4000/user/refresh-token', token)
            .then(newToken => {
                dispatch(refreshTokenActionCreator(newToken)); //refreshing token

                if (!getState().auth.id) dispatch(signInLocalAction()); //if user is not auth we try to login auto
                else dispatch(resetTokenTimer());
            })
            .catch(err => {
                dispatch(errorActionCreator(err));
                dispatch(logoutActionCreator());
            });
    }
}