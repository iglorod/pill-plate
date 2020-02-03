import jwt from 'jsonwebtoken';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    id: null,
    email: null,
    token: null,
    expirationTime: null,
    errorMessage: '',
}

const saveToLocalStorage = (data) => {
    localStorage.setItem('id', data.id);
    localStorage.setItem('email', data.email);
    localStorage.setItem('token', data.token);
    localStorage.setItem('expirationTime', data.expirationTime);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN: {
            const decoded = jwt.decode(action.token.data);

            const userData = {
                id: decoded.id,
                email: decoded.email,
                token: action.token.data,
                expirationTime: decoded.exp
            }

            saveToLocalStorage(userData);

            return {...userData};
        }

        case actionTypes.SIGN_UP: {
            const decoded = jwt.decode(action.token.data);

            const userData = {
                id: decoded.id,
                email: decoded.email,
                token: action.token.data,
                expirationTime: decoded.exp
            }

            saveToLocalStorage(userData);

            return {...userData};
        }

        case actionTypes.AUTH_ERROR: {
            return {
                errorMessage: action.err.response.data.message
            }
        }

        default: return state;
    }
} 

export default reducer;