import {
    RECEIVE_QUESTIONS,
    ADD_QUESTION,
    REMOVE_QUESTION,
    VOTE_QUESTION,
} from "../actions/questions"

export default function questions(state = [], action) {
    const { question } = action
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            }
        case ADD_QUESTION:
            return {
                byId: {
                    ...state.byId,
                    [question.id]: {
                        ...question,
                        optionOne: {
                            ...question.optionOne,
                            votes: [],
                        },
                        optionTwo: {
                            ...question.optionTwo,
                            votes: [],
                        },
                    },
                },
                allIds: [...state.allIds, question.id],
            }
        case REMOVE_QUESTION:
            delete state.byId[question.id]
            return {
                byId: state.byId,
                allIds: state.allIds.filter((id) => id !== action.id),
            }

        case VOTE_QUESTION:
            
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.qid]: {
                        ...state.byId[action.qid],
                        [action.answer]: {
                            ...state.byId[action.qid][action.answer],
                            votes: [
                                ...state.byId[action.qid][action.answer]
                                    .votes,
                                action.authedUser,
                            ],
                        },
                    },
                },
            }
        default:
            return state
    }
}
