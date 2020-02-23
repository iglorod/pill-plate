import io from 'socket.io-client';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    socket: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONNECT_SOCKET: {
            if (state.socket !== null) break;
            const socket = io.connect('http://localhost:4000');

            return {
                socket: socket,
            }
        }

        case actionTypes.DISCONNECT_SOCKET: {
            state.socket.close();

            return { ...initialState }
        }

        default: return state;
    }
}

export default reducer;
