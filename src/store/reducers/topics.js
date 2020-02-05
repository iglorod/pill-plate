import * as actionTypes from '../actions/actionTypes';

const initialState = {
    topics: [],
    loading: false,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }

        case actionTypes.GET_TOPICS: {
            return {
                ...state
            }
        }

        case actionTypes.TOPICS_ERROR: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }

        case actionTypes.FINISH_FETCHING: {
            const topics = action.topics.map(item => {
                const humanDate = new Date(item.date * 1000).toLocaleDateString();
                item.date = humanDate;
                return item;
            });
            
            return {
                loading: false,
                error: false,
                topics: [...topics]
            }
        }

        default: return state;
    }
}

export default reducer;
