import * as actionTypes from '../actions/actionTypes';

const initialState = {
    topics: [],
    openedTopicId: null,
    loading: false,
    error: false,
    wasFetched: false,
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
                topics: [...topics],
                wasFetched: true,
            }
        }

        case actionTypes.ADD_TOPIC: {
            const humanDate = new Date(action.topic.date * 1000).toLocaleDateString();  

            return {
                ...state,
                topics: [
                    ...state.topics,
                    {
                        ...action.topic,
                        date: humanDate,
                    }
                ]
            }
        }

        case actionTypes.EDIT_TOPIC: {
            const topics = state.topics.filter(item => item._id !== action.topic._id);
          
            return {
                ...state,
                topics: [
                    { ...action.topic },
                    ...topics,
                ]
            }
        }

        case actionTypes.SET_CURRENT_TOPIC: {
            return {
                ...state,
                openedTopicId: action.topicId,
            }
        }

        default: return state;
    }
}

export default reducer;
