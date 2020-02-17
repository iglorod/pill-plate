import * as actionTypes from '../actions/actionTypes';

const initialState = {
    savingMessages: false,
    fetchingMessages: false,
    topics: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_MESSAGES_SAVING: {
            return {
                ...state,
                savingMessages: true,
            }
        }

        case actionTypes.FINISH_MESSAGES_SAVING: {
            return {
                ...state,
                savingMessages: false,
            }
        }

        case actionTypes.MESSAGE_SAVE: {
            let topicMessages = [
                { ...action.message }
            ]

            if (state.topics[action.message.topicId])
                topicMessages = [
                    ...state.topics[action.message.topicId].messages,
                    {
                        ...action.message
                    }
                ]

            return {
                ...state,
                topics: {
                    ...state.topics,
                    [action.message.topicId]: {
                        ...state.topics[action.message.topicId],
                        messages: [
                            ...topicMessages,
                        ]
                    }
                }
            }
        }

        case actionTypes.START_MESSAGES_FETCHING: {
            return {
                ...state,
                fetchingMessages: true,
            }
        }

        case actionTypes.FINISH_MESSAGES_FETCHING: {
            return {
                ...state,
                fetchingMessages: false,
            }
        }

        case actionTypes.FETCH_MESSAGES: {
            if (action.messages.length === 0){
                return {
                    ...state,
                    topics: {
                        ...state.topics,
                        [action.topicId]: {
                            ...state.topics[action.topicId],
                            allIsFetched: true,
                        }
                    }
                }
            }

            let topicMessages = [
                ...action.messages
            ]

            if (state.topics[action.topicId]) {
                topicMessages = [
                    ...action.messages,
                    ...state.topics[action.topicId].messages,
                ]
            }

            return {
                ...state,
                topics: {
                    ...state.topics,
                    [action.topicId]: {
                        ...state.topics[action.topicId],
                        messages: [
                            ...topicMessages,
                        ],
                        allIsFetched: false,
                    }
                }
            }
        }

        default: return state;
    }
}

export default reducer;
