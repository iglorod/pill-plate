import * as actionTypes from '../actions/actionTypes';

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TEXT_MESSAGE_SAVE: {
            console.log(state);
            let topicMessages = [
                { ...action.message }
            ]

            if (state[action.message.topicId])
                topicMessages = [
                    ...state[action.message.topicId].messages,
                    {
                        ...action.message
                    }
                ]

            return {
                ...state,
                [action.message.topicId]: {
                    ...state[action.message.topicId],
                    messages: [
                        ...topicMessages,
                    ]
                }
            }
        }

        default: return state;
    }
}

export default reducer;
